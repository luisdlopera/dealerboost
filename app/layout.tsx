import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google'; // Import Oswald and Inter
import './globals.css';
import { SmoothScroll } from '@/components/layout/SmoothScroll'; // Import SmoothScroll

// Configure Oswald (Display/Headers)
const oswald = Oswald({
	variable: '--font-oswald',
	subsets: ['latin'],
	display: 'swap',
});

// Configure Inter (Body)
const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'DealerBoost | Maximizamos tus ventas de carros',
	description:
		'Agencia de marketing digital especializada en ventas de autos. Generación de leads, embudos de venta y automatización.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='es' className={`${oswald.variable} ${inter.variable}`}>
			<body className='bg-black text-white antialiased'>
				<SmoothScroll>{children}</SmoothScroll>
			</body>
		</html>
	);
}
