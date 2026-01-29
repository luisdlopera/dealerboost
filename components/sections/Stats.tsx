'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
	{ value: 1.4, suffix: 'M+', label: 'Millones USD generados', isFloat: true },
	{ value: 20, suffix: 'K+', label: 'Leads Generados', isFloat: false },
	{ value: 5, suffix: 'K+', label: 'Citas Confirmadas', isFloat: false },
	{ value: 200, suffix: '+', label: 'Carros Vendidos', isFloat: false },
];

export const Stats = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// 1. Line Separator Animation
			gsap.fromTo(
				'.stat-separator',
				{ scaleX: 0, opacity: 0 },
				{
					scaleX: 1,
					opacity: 1,
					duration: 1.5,
					ease: 'expo.out',
					scrollTrigger: {
						trigger: containerRef.current,
						start: 'top 80%',
					},
				},
			);

			// 2. Vertical Divider Animation
			gsap.fromTo(
				'.vertical-divider',
				{ scaleY: 0, opacity: 0 },
				{
					scaleY: 1,
					opacity: 0.2, // Subtle
					duration: 1.5,
					ease: 'expo.out',
					stagger: 0.2,
					scrollTrigger: {
						trigger: containerRef.current,
						start: 'top 80%',
					},
				},
			);

			// 3. Number Counter Animation
			stats.forEach((stat, i) => {
				const obj = { val: 0 };
				const target = stat.value;
				const element = document.getElementById(`stat-num-${i}`);

				if (element) {
					gsap.to(obj, {
						val: target,
						duration: 2.5,
						ease: 'power2.out',
						scrollTrigger: {
							trigger: containerRef.current,
							start: 'top 75%',
						},
						onUpdate: () => {
							element.innerText = stat.isFloat ? obj.val.toFixed(1) : Math.round(obj.val).toString();
						},
					});
				}
			});

			// 4. Label Fade Up
			gsap.fromTo(
				'.stat-label',
				{ y: 20, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 1,
					stagger: 0.1,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: containerRef.current,
						start: 'top 70%',
					},
				},
			);
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<section ref={containerRef} className='relative z-10 w-full px-6 py-20 md:px-20'>
			{/* Top Border */}
			<div className='stat-separator mb-12 h-[1px] w-full origin-left bg-white/20'></div>

			<div className='relative grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-0'>
				{stats.map((stat, index) => (
					<div key={index} className='group relative flex flex-col items-center justify-center py-6'>
						{/* Vertical Divider (only for non-last items on desktop) */}
						{index !== stats.length - 1 && (
							<div className='vertical-divider absolute top-0 right-0 hidden h-full w-[1px] origin-top bg-white lg:block'></div>
						)}

						{/* Content */}
						<div className='relative text-center'>
							<div className='font-display text-primary flex items-baseline justify-center gap-1 text-6xl font-bold tracking-tighter md:text-7xl lg:text-8xl'>
								<span id={`stat-num-${index}`}>0</span>
								<span className='text-4xl md:text-5xl'>{stat.suffix}</span>
							</div>
							<p className='stat-label mt-4 font-sans text-sm font-medium tracking-widest text-zinc-400 uppercase md:text-base'>
								{stat.label}
							</p>
						</div>
					</div>
				))}
			</div>

			{/* Bottom Border */}
			<div className='stat-separator mt-12 h-[1px] w-full origin-right bg-white/20'></div>
		</section>
	);
};
