'use client';

import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Menu, X } from 'lucide-react'; // We need lucide-react for icons, I check if installed or I use svg directly.
// I will use SVGs directly to avoid install dependency if not needed, but likely I should install lucide-react as it is standard.
// I'll assume I can install it or use simple SVGs. I'll use simple SVGs for now.

export const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<>
			<header className='pointer-events-none fixed top-0 left-0 z-50 flex w-full items-center justify-between bg-transparent px-8 py-6 text-white mix-blend-difference'>
				{/* Logo */}
				<Link
					href='/'
					className='font-display pointer-events-auto relative z-50 flex items-center gap-3 text-2xl font-bold tracking-tighter uppercase'
				>
					<img
						src='/Isotipo.svg'
						alt='DealerBoost Logo'
						className='h-8 w-8 object-contain'
					/>
					<span>
						DealerBoost<span className='text-primary'>.</span>
					</span>
				</Link>

				{/* Menu Trigger */}
				<button
					onClick={() => setIsMenuOpen(true)}
					className='group hover:text-primary pointer-events-auto flex items-center gap-2 transition-colors focus:outline-none'
				>
					<span className='font-display hidden text-lg font-semibold uppercase sm:block'>Menu</span>
					<div className='group-hover:border-primary group-hover:bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all'>
						{/* Simple Menu Icon */}
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='20'
							height='20'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<line x1='4' x2='20' y1='12' y2='12' />
							<line x1='4' x2='20' y1='6' y2='6' />
							<line x1='4' x2='20' y1='18' y2='18' />
						</svg>
					</div>
				</button>
			</header>

			{/* Full Screen Menu Overlay */}
			<div
				className={clsx(
					'fixed inset-0 z-40 flex flex-col items-center justify-center bg-black transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]',
					isMenuOpen
						? 'clip-path-full pointer-events-auto opacity-100'
						: 'clip-path-none pointer-events-none opacity-0',
				)}
			>
				<button
					onClick={() => setIsMenuOpen(false)}
					className='hover:text-primary absolute top-6 right-8 flex h-12 w-12 items-center justify-center text-white transition-colors'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='32'
						height='32'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path d='M18 6 6 18' />
						<path d='m6 6 12 12' />
					</svg>
				</button>

				<nav className='flex flex-col gap-4 text-center'>
					{['Inicio', 'Servicios', 'Método', 'Contacto'].map((item, i) => (
						<Link
							key={item}
							href={`#${item.toLowerCase()}`}
							onClick={() => setIsMenuOpen(false)}
							className='font-display hover:text-primary animate-slideUp text-6xl font-bold uppercase opacity-0 md:text-8xl'
							style={{ animationDelay: `${i * 100}ms` }}
						>
							{item}
						</Link>
					))}
				</nav>
			</div>

			<style jsx>{`
				.clip-path-none {
					clip-path: circle(0% at 100% 0);
				}
				.clip-path-full {
					clip-path: circle(150% at 100% 0);
				}
			`}</style>
		</>
	);
};
