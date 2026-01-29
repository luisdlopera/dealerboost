'use client';

import { Suspense, useLayoutEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, Float } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Model Component
const CarModel = () => {
	const { scene } = useGLTF('/car_3d1.glb');
	const modelRef = useRef<any>(null);
	const { camera } = useThree();

	useLayoutEffect(() => {
		// Initial Setup
		if (modelRef.current) {
			modelRef.current.rotation.y = Math.PI / 4;
			modelRef.current.rotation.x = 0;
		}

		// Animation
		const ctx = gsap.context(() => {
			if (!modelRef.current) return;

			// Rotate model on scroll
			gsap.to(modelRef.current.rotation, {
				y: Math.PI * 2.5, // 2 full spins and a bit
				x: 0.1,
				scrollTrigger: {
					trigger: '#car-section',
					start: 'top bottom',
					end: 'bottom top',
					scrub: 1.5,
				},
			});
		}); // Removed modelRef as scope because it's a THREE object, not a DOM element

		return () => ctx.revert();
	}, []);

	return (
		<group ref={modelRef} dispose={null} scale={[100, 100, 100]} position={[0, 0.5, 0]}>
			<primitive object={scene} />
		</group>
	);
};

export const WeBreatheCars = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.text-reveal-car',
				{ y: 50, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 1,
					stagger: 0.1,
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
			id='car-section'
			ref={containerRef}
			className='relative flex min-h-[100vh] w-full flex-col items-center overflow-hidden bg-[#080808] py-24 lg:flex-row'
		>
			{/* Abstract Background Element (Gradient) */}
			<div className='bg-primary/10 pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[80vw] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]'></div>

			{/* Text Content */}
			<div className='z-10 order-2 mt-12 w-full px-6 md:px-20 lg:order-1 lg:mt-0 lg:w-1/2'>
				<h2 className='text-reveal-car font-display mb-8 text-7xl leading-[0.9] font-bold tracking-tighter text-white uppercase md:text-8xl lg:text-9xl'>
					Respiramos <br />
					<span className='text-outline-stroke-blue text-transparent'>Carros</span>
				</h2>

				<div className='text-reveal-car max-w-xl'>
					<p className='mb-6 text-xl leading-relaxed font-light text-zinc-300'>
						Nuestro equipo de marketers <span className='text-primary font-bold'>guerreros ninja</span> no
						solo pueden brindarte una estrategia práctica sobre cómo patear el trasero de tu competencia,
						sino también explotar tus ventas y ayudarte a hacer crecer tu negocio de carros.
					</p>
					<div className='bg-primary mb-6 h-[1px] w-24'></div>

					{/* 
                  Replacing "Mira este video..." text with a contextual line about the model visualization 
                  OR keeping it as requested but making it make sense contextually if there's no video player.
                  I will assume the 3D model IS the visual showcase replacing the video.
                */}
					<p className='mb-10 text-zinc-500 italic'>Mira la calidad que entregamos para nuestros clientes.</p>

					<a
						href='#contact'
						className='group bg-primary font-display hover:text-primary relative inline-flex items-center gap-4 rounded-sm px-8 py-4 text-lg font-bold tracking-wide text-white uppercase transition-all duration-300 hover:bg-white'
					>
						<span>Agendar Consultoría Gratis</span>
						<span className='group-hover:bg-primary h-2 w-2 rounded-full bg-white transition-colors'></span>
					</a>
				</div>
			</div>

			{/* 3D Model Experience */}
			<div className='relative order-1 flex h-[50vh] w-full items-center justify-center lg:order-2 lg:h-screen lg:w-1/2'>
				<div className='absolute inset-0 h-full w-full'>
					<Canvas shadows dpr={[1, 2]} camera={{ position: [5, 2, 5], fov: 45 }}>
						<Suspense fallback={null}>
							<Environment preset='city' />
							<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
							<group position={[0, -0.5, 0]}>
								<CarModel />
								<ContactShadows
									resolution={1024}
									scale={20}
									blur={2}
									opacity={0.5}
									far={4}
									color='#000000'
								/>
							</group>
						</Suspense>
						{/* Controls only if needed, but we drive with scroll */}
						{/* <OrbitControls enableZoom={false} enablePan={false} /> */}
					</Canvas>
				</div>
			</div>

			<style jsx>{`
				.text-outline-stroke-blue {
					-webkit-text-stroke: 2px #1d4ed8;
					color: transparent;
				}
			`}</style>
		</section>
	);
};
