import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';
import { WeBreatheCars } from '@/components/sections/WeBreatheCars';
import { Timeline } from '@/components/sections/Timeline';
import { Services } from '@/components/sections/Services'; // Import Services
import { GeometricBackground } from '@/components/ui/GeometricBackground';

export default function Home() {
	return (
		<main className='relative min-h-screen'>
			<GeometricBackground />
			<Header />
			<Hero />
			<Stats />
			<WeBreatheCars />
			<Timeline />
			<Services /> {/* Add Services Section */}
			<Footer />
		</main>
	);
}
