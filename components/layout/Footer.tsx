'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
	const footerRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Parallax Effect for the Massive Text
			gsap.to('.footer-brand-text', {
				y: 0,
				opacity: 1,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: footerRef.current,
					start: 'top 90%',
					end: 'bottom bottom',
					scrub: 1,
				},
			});

			// Staggered Reveal for Columns
			gsap.fromTo(
				'.footer-col',
				{ y: 50, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 1,
					stagger: 0.1,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: footerRef.current,
						start: 'top 85%',
					},
				},
			);
		}, footerRef);

		return () => ctx.revert();
	}, []);

	return (
		<footer
			ref={footerRef}
			className='relative overflow-hidden border-t border-white/10 bg-[#080808] px-6 pt-32 pb-6 text-white md:px-12'
		>
			{/* Main Content Grid */}
			<div className='relative z-10 mx-auto mb-32 grid max-w-[1800px] grid-cols-1 gap-12 md:grid-cols-12 md:gap-8'>
				{/* Col 1: Brand & Desc */}
				<div className='footer-col md:col-span-4'>
					<h3 className='font-display mb-6 text-2xl font-bold tracking-wider uppercase'>
						DealerBoost<span className='text-primary'>.</span>
					</h3>
					<p className='max-w-sm text-lg leading-relaxed text-zinc-500'>
						Ecosistemas de venta automatizados para dealers que buscan dominar su mercado. No permitas que
						novatos manejen tu inversión.
					</p>
					<div className='mt-8'>
						<a
							href='mailto:info@dealerboost.co'
							className='hover:text-primary text-xl font-medium transition-colors'
						>
							info@dealerboost.co
						</a>
					</div>
				</div>

				{/* Col 2: Navigation */}
				<div className='footer-col md:col-span-2 md:col-start-6'>
					<h4 className='mb-8 font-sans text-xs tracking-[0.2em] text-zinc-500 uppercase'>Menu</h4>
					<ul className='font-display flex flex-col gap-4 text-2xl font-bold tracking-tight uppercase'>
						{['Inicio', 'Servicios', 'Método', 'Resultados'].map((item) => (
							<li key={item}>
								<Link
									href={`#${item.toLowerCase()}`}
									className='hover:text-primary block transition-colors duration-300 hover:pl-2'
								>
									{item}
								</Link>
							</li>
						))}
					</ul>
				</div>

				{/* Col 3: Socials & Address */}
				<div className='footer-col flex h-full flex-col justify-between md:col-span-4 md:col-start-9'>
					<div>
						<h4 className='mb-8 font-sans text-xs tracking-[0.2em] text-zinc-500 uppercase'>Ubicación</h4>
						<address className='text-lg leading-relaxed text-zinc-400 not-italic'>
							30 N Gould St Ste R<br />
							Sheridan, WY 82801
							<br />
							United States
							<br />
							<a href='tel:+13074617830' className='mt-2 block transition-colors hover:text-white'>
								+1 (307) 461-7830
							</a>
						</address>

						<div className='mt-12 flex gap-6'>
							{['LinkedIn', 'Instagram', 'WhatsApp'].map((social) => (
								<a
									key={social}
									href='#'
									className='rounded-full border border-white/20 px-4 py-2 text-sm tracking-wider uppercase transition-all hover:bg-white hover:text-black'
								>
									{social}
								</a>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Massive Brand Anchor */}
			<div className='relative w-full overflow-hidden border-t border-white/10 pt-4'>
				<h1 className='footer-brand-text font-display translate-y-20 text-center text-[13vw] leading-none font-bold tracking-tighter text-white/5 opacity-50 select-none'>
					DEALERBOOST
				</h1>

				<div className='mt-4 flex items-center justify-between px-2 text-xs text-zinc-600 uppercase'>
					<span>© {new Date().getFullYear()} DealerBoost LLC.</span>
					<div className='flex gap-6'>
						<Link href='#' className='hover:text-zinc-400'>
							Privacy Policy
						</Link>
						<Link href='#' className='hover:text-zinc-400'>
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};
