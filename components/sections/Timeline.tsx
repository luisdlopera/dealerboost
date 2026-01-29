'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
	{
		id: '01',
		title: 'Minamos datos',
		description:
			"Hemos recopilado años de información sobre interesados en compra de vehículo que viven en más de 25 estados. Hemos gastado millones en línea recopilando estos datos para usarlos en nuestras campañas de vehículos y poder atraer así clientes interesados en vehículos que sean 'calificados para el crédito'.",
	},
	{
		id: '02',
		title: 'Construyendo la campaña',
		description:
			'En lugar de publicar anuncios genéricos con la imagen de un carro a los que las personas han estado expuestas durante años, usamos estrategias irresistibles para los vehículos que van de la mano con el concepto de concesionario, así aumentamos nuestras posibilidades de competir con presupuestos de 7 cifras.',
	},
	{
		id: '03',
		title: 'Diseñando el embudo',
		description:
			"Usamos un embudo con vehículos en lugar de un simple 'anuncio de formulario de prospecto de Facebook' para convencer más y atraer a clientes calificados interesados en comprar uno de nuestros vehículos, y así realicen el proceso de brindarnos su información personal.",
	},
	{
		id: '04',
		title: 'Pre-calificación',
		description:
			'Nuestro proceso de pre-calificación está diseñado para recibir la información de contacto de clientes calificados con un alto grado de interés. Es acá donde revisamos si nuestro cliente cumple con nuestros requisitos mínimos o no es elegible para comprar con nosotros.',
	},
	{
		id: '05',
		title: 'Automatización',
		description:
			'A medida que los clientes potenciales exitosos cumplen con nuestros requisitos, se les anima a programar una cita en su calendario. Este proceso de automatización significa que, en lugar de perseguir clientes potenciales, puede pasar su tiempo con clientes interesados.',
	},
	{
		id: '06',
		title: 'Nutrir',
		description:
			'Aquí es donde continuamos entreteniendo e informando a los clientes que han expresado interés mediante secuencias de mensajes. El objetivo principal es asegurarse de que su negocio permanezca en la mente, incluso mucho después de que sus clientes potenciales hayan pasado por el proceso de calificación.',
	},
];

export const Timeline = () => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const cards = gsap.utils.toArray<HTMLElement>('.process-card');

			// FIX: Ensure first card is ALWAYS visible initially so there is no empty space.
			// Others are hidden below waiting to slide up.
			if (cards.length > 0) {
				gsap.set(cards[0], { autoAlpha: 1, y: 0, scale: 1 });
				gsap.set(cards.slice(1), { autoAlpha: 0, y: 100, scale: 0.95 });
			}

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: triggerRef.current,
					start: 'top top',
					end: '+=4000',
					scrub: 1,
					pin: true,
				},
			});

			// Animate remaining cards (2 to 6) stack on top
			cards.slice(1).forEach((card) => {
				tl.to(card, {
					autoAlpha: 1,
					y: 0,
					scale: 1,
					duration: 1,
					ease: 'power2.out',
				});

				// Hold moment
				tl.to({}, { duration: 0.5 });
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section ref={sectionRef} className='relative z-10 bg-[#050505] text-white'>
			{/* Trigger container */}
			<div ref={triggerRef} className='relative flex h-screen w-full items-center justify-center overflow-hidden'>
				{/* Background Text */}
				<h2 className='font-display absolute top-20 left-10 z-0 text-[15vw] leading-none font-bold text-white/5 uppercase select-none'>
					Enfoque
				</h2>

				<div className='relative z-10 flex h-full w-full max-w-6xl flex-col items-center justify-between px-6 md:flex-row'>
					{/* Left Static Panel */}
					<div className='mb-12 w-full md:mb-0 md:w-1/3'>
						<h3 className='font-display mb-6 text-5xl leading-tight font-bold uppercase md:text-7xl'>
							Nuestro <span className='text-primary'>Método</span>
						</h3>
						<p className='text-lg text-zinc-400'>
							Un sistema probado de 6 pasos para dominar el mercado automotriz. Desliza para conocer el
							proceso.
						</p>
					</div>

					{/* Right Animation Panel - Cards Stacked */}
					<div className='perspective-1000 relative h-[400px] w-full md:h-[500px] md:w-1/2'>
						{steps.map((step, index) => (
							<div
								key={step.id}
								// Removed opacity-0 class to let GSAP handle visibility
								className='process-card absolute inset-0 flex origin-center flex-col justify-center rounded-sm border border-white/10 bg-zinc-900/90 p-8 shadow-2xl backdrop-blur-xl will-change-transform md:p-12'
								style={{ zIndex: index + 1 }}
							>
								<span className='font-display absolute top-4 right-4 text-8xl font-bold text-white/10 md:text-9xl'>
									{step.id}
								</span>
								<h4 className='font-display mb-6 text-3xl font-bold text-white uppercase md:text-4xl'>
									{step.title}
								</h4>
								<p className='font-sans text-sm leading-relaxed text-zinc-400 md:text-base'>
									{step.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* CSS for perspective */}
			<style jsx>{`
				.perspective-1000 {
					perspective: 1000px;
				}
			`}</style>
		</section>
	);
};
