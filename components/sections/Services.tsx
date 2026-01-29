'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const services = [
	{
		title: 'Generación de prospectos frescos y exclusivos',
		content: (
			<>
				<p className='mb-4 text-zinc-300'>
					<strong className='text-white'>NO vendemos clientes potenciales.</strong> No estamos en el negocio
					de la venta o reventa de clientes potenciales. Construimos tu propio embudo de generación de
					clientes que escupe clientes como locos <em className='text-white not-italic'>CADA ¡DÍA!</em>
				</p>
				<p className='text-zinc-500'>
					Y lo que es más importante, te ayudamos a convertir esos clientes potenciales en ventas.
				</p>
			</>
		),
	},
	{
		title: 'Formación en ventas de carros',
		content: (
			<>
				<p className='mb-4 text-zinc-300'>
					Si hasta ahora cuando hablas con clientes no sientes seguridad para direccionar la venta y que esta
					se haga efectiva, pero quieres dar el salto y tener un sistema efectivo que seguir...{' '}
					<span className='text-white'>No te preocupes.</span>
				</p>
				<p className='text-zinc-500'>
					Tenemos todos los recursos que necesitas para convertir esos clientes potenciales en ventas
					concretadas sin tener que pasar por un montón de pruebas y errores.
				</p>
			</>
		),
	},
];

export const Services = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Animate lines
			gsap.fromTo(
				'.service-line',
				{ scaleX: 0 },
				{
					scaleX: 1,
					duration: 1.5,
					ease: 'expo.out',
					stagger: 0.2,
					scrollTrigger: {
						trigger: containerRef.current,
						start: 'top 70%',
					},
				},
			);

			// Fade up content
			gsap.fromTo(
				'.service-item',
				{ y: 50, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 1,
					stagger: 0.2,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: containerRef.current,
						start: 'top 60%',
					},
				},
			);
		}, containerRef);
		return () => ctx.revert();
	}, []);

	return (
		<section
			id='services'
			ref={containerRef}
			className='border-t border-white/5 bg-[#050505] px-6 py-32 text-white md:px-12'
		>
			<div className='mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-12'>
				{/* Title Column (Sticky) */}
				<div className='relative lg:col-span-5'>
					<div className='sticky top-32'>
						<h2 className='font-display mb-8 text-7xl leading-[0.8] font-bold tracking-tighter uppercase md:text-9xl'>
							Nuestro <br />
							<span className='text-primary opacity-80'>Servicio</span>
						</h2>
						<p className='mt-8 hidden max-w-sm border-l border-white/20 pl-6 text-lg text-zinc-500 lg:block'>
							Soluciones integrales de marketing y ventas diseñadas específicamente para el sector
							automotriz.
						</p>
					</div>
				</div>

				{/* Content Column */}
				<div className='flex flex-col gap-0 lg:col-span-7'>
					{services.map((service, index) => (
						<div key={index} className='service-item group relative py-12'>
							{/* Top Line Separator */}
							<div className='service-line absolute top-0 left-0 h-[1px] w-full origin-left bg-white/20 transition-all duration-500 group-hover:h-[2px] group-hover:bg-white'></div>

							<h3 className='font-display group-hover:text-primary mb-8 text-4xl font-bold uppercase transition-colors duration-300 md:text-5xl'>
								{service.title}
							</h3>

							<div className='group-hover:border-primary/50 max-w-2xl border-l-0 border-white/10 pl-0 font-sans text-lg leading-relaxed transition-colors duration-500 md:text-xl lg:border-l lg:pl-8'>
								{service.content}
							</div>
						</div>
					))}

					{/* Bottom Line */}
					<div className='service-line h-[1px] w-full origin-left bg-white/20'></div>

					<div className='service-item mt-16'>
						<a
							href='#contact'
							className='group flex w-full items-center justify-between border border-white/20 p-8 transition-all duration-500 hover:bg-white hover:text-black'
						>
							<span className='font-display text-2xl font-bold tracking-wider uppercase md:text-4xl'>
								Agendar Consultoría Gratis
							</span>
							<svg
								className='h-8 w-8 transform transition-transform duration-500 group-hover:-rotate-45 md:h-12 md:w-12'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={1.5}
									d='M14 5l7 7m0 0l-7 7m7-7H3'
								/>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};
