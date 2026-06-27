import HistorySection from './sections/HistorySection'
import MvvSection from './sections/MvvSection'
import OdsSection from './sections/OdsSection'
import TeamSection from './sections/TeamSection'
import HeroSobre from './sections/HeroSobre'
import LinksSection from './sections/LinksSection'

export default function Sobre() {
    return (
        <main>
            <HeroSobre />
            <HistorySection />
            <MvvSection />
            <OdsSection />
            <TeamSection />
            <LinksSection />
        </main>
    )
}