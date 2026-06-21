import Tesseract from 'tesseract.js';
import { validarCNPJ } from '../utils/validateCnpj';

/**
 * Inicializa a câmera nativa do dispositivo.
 * Retorna o fluxo (stream) para ser associado à tag <video>.
 */
export const iniciarCamera = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: "environment" } }, // Câmera traseira em celulares
            audio: false
        });
        return stream;
    } catch (error) {
        console.error("Erro ao acessar hardware da câmera:", error);
        throw new Error("Não foi possível acessar a câmera. Verifique as permissões.");
    }
};

/**
 * Interrompe todos os rastros de hardware ativos da câmera.
 */
export const pararCamera = (stream) => {
    if (stream && stream.getTracks) {
        stream.getTracks().forEach(track => track.stop());
    }
};

/**
 * Captura o frame atual de um elemento HTMLVideoElement, binariza e retorna um objeto File.
 */
export const capturarFotoDaCamera = (videoElement) => {
    if (!videoElement) throw new Error("Elemento de vídeo não encontrado.");

    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Não foi possível inicializar o contexto 2D do Canvas.");

    // Desenha o frame atual do vídeo no Canvas temporário
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            if (blob) {
                const arquivoFoto = new File([blob], `receita_camera_${Date.now()}.jpg`, { type: "image/jpeg" });
                resolve(arquivoFoto);
            }
        }, 'image/jpeg', 0.95);
    });
};

/**
 * Aplica um filtro de binarização (preto e branco) na imagem para melhorar o OCR.
 */
export const preprocessImage = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imgData.data;
                
                for (let i = 0; i < data.length; i += 4) {
                    const brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
                    const v = brightness < 120 ? 0 : 255;
                    data[i] = v; data[i+1] = v; data[i+2] = v;
                }
                ctx.putImageData(imgData, 0, 0);
                resolve(canvas.toDataURL());
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
};

/**
 * Processa o arquivo de imagem, roda o OCR e extrai os dados estruturados via Regex.
 */
export const processarReceitaOCR = async (file) => {
    const urlOriginalDaImagem = URL.createObjectURL(file);

    try {
        const processedImgUrl = await preprocessImage(file);
        const result = await Tesseract.recognize(processedImgUrl, 'por');
        const text = result.data.text;
        const confidence = result.data.confidence;

        // Expressões Regulares
        const crmRegex = /(?:CRM|crm)[:\s]*(\d+[\s]*\/[\s]*[A-Za-z]{2}|\d+)/i;
        const cnpjRegex = /(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})/;
        const pacienteRegex = /(?:Paciente|Nome|Para)[:\s]*([A-Za-zÀ-ÖØ-öø-ÿ\s]{3,30})/i;
        const medicoRegex = /(?:Dr\.|Dra\.|Médico|Médica)[:\s]*([A-Za-zÀ-ÖØ-öø-ÿ\s]{3,30})/i;
        const dataRegex = /(\d{2}\/\d{2}\/\d{4}|\d{2}\/\d{2}\/\d{2})/;

        const crmMatch = text.match(crmRegex);
        const cnpjMatch = text.match(cnpjRegex);
        const pacienteMatch = text.match(pacienteRegex);
        const medicoMatch = text.match(medicoRegex);
        const dataMatch = text.match(dataRegex);

        const cnpjDetectado = cnpjMatch ? cnpjMatch[0].replace(/[^\d]+/g, '') : '';
        const isCnpjValido = cnpjDetectado ? validarCNPJ(cnpjDetectado) : false;

        let tipoDetectado = 'Simples';
        if (/controle especial|notificação|retida/i.test(text)) tipoDetectado = 'Controle Especial (C1/C5)';
        if (/antibiótico|antimicrobiano|amoxicilina|azimicina/i.test(text)) tipoDetectado = 'Antimicrobiano';

        const primeiraLinha = text.split('\n').find(l => l.trim().length > 0) || 'Fórmula Identificada';

        return {
            id: Date.now(),
            nome: primeiraLinha.substring(0, 30).trim(),
            textoExtraido: text,
            paciente: pacienteMatch ? pacienteMatch[1].trim() : '',
            crmMedico: crmMatch ? crmMatch[1].trim() : '',
            nomeMedico: medicoMatch ? medicoMatch[1].trim() : '',
            cnpjFarmacia: isCnpjValido ? cnpjMatch[0].trim() : '', 
            dataEmissao: dataMatch ? dataMatch[0] : new Date().toLocaleDateString('pt-BR'),
            validadeDias: tipoDetectado === 'Antimicrobiano' ? '10' : '30',
            tipoReceita: tipoDetectado,
            confidence: confidence,
            imagemUrl: urlOriginalDaImagem
        };

    } catch (error) {
        URL.revokeObjectURL(urlOriginalDaImagem);
        throw new Error("Erro ao ler e processar os metadados da receita.");
    }
};