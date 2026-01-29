'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Reveal Text Lines
			gsap.fromTo(
				'.hero-line',
				{ y: 100, opacity: 0, rotateX: -20 },
				{ y: 0, opacity: 1, rotateX: 0, stagger: 0.1, duration: 1.2, ease: 'power4.out', delay: 0.2 },
			);

			// Fade in subhead and CTA
			gsap.fromTo(
				'.hero-fade',
				{ y: 20, opacity: 0 },
				{ y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out', delay: 0.8 },
			);
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<section ref={containerRef} className='relative flex min-h-screen flex-col justify-center px-6 pt-20 md:px-20'>
			<div ref={textRef} className='z-10 max-w-5xl'>
				<div className='overflow-hidden'>
					<h1 className='hero-line font-display text-[12vw] leading-[0.85] font-bold tracking-[-0.02em] text-white uppercase'>
						Maximizamos
					</h1>
				</div>
				<div className='overflow-hidden'>
					<h1 className='hero-line font-display text-outline-stroke text-[12vw] leading-[0.85] font-bold tracking-[-0.02em] uppercase opacity-70'>
						Tus Ventas
					</h1>
				</div>
				<div className='overflow-hidden'>
					<h1 className='hero-line font-display text-[12vw] leading-[0.85] font-bold tracking-[-0.02em] text-white uppercase'>
						De Carros <span className='text-primary align-super text-[2vw]'>®</span>
					</h1>
				</div>

				<div className='hero-fade mt-12 flex max-w-2xl flex-col items-start gap-8 md:flex-row'>
					<p className='font-sans text-lg leading-relaxed text-zinc-400 md:text-xl'>
						No permitas que novatos publiquen tus anuncios. En DealerBoost, estructuramos ecosistemas de
						venta automatizados para dealers que buscan dominar su mercado.
					</p>
				</div>

				<div className='hero-fade mt-12'>
					<a
						href='#contact'
						className='group font-display hover:bg-primary relative inline-flex items-center gap-4 rounded-sm bg-white px-10 py-5 text-lg font-bold tracking-wide text-black uppercase transition-all duration-300 hover:text-white'
					>
						<span>Agendar Consultoría Gratis</span>
						<span className='bg-primary h-2 w-2 rounded-full transition-colors group-hover:bg-white'></span>
					</a>
				</div>
			</div>

			{/* CSS for Outline Text Text */}
			<style jsx>{`
				.text-outline-stroke {
					-webkit-text-stroke: 2px white;
					color: transparent;
				}
				.text-outline-stroke:hover {
					color: white;
					transition: color 0.3s ease;
				}
			`}</style>
		</section>
	);
};
