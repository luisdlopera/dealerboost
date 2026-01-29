'use client';

export const GeometricBackground = () => {
	return (
		<div className='pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#050505] select-none'>
			{/* Grid Pattern */}
			<div
				className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]"
				style={{
					backgroundSize: '40px 40px',
					backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
				}}
			></div>

			{/* Floating Wireframe Cube (Abstract representation using SVG) */}
			<div className='animate-float-slow text-primary absolute top-1/4 right-0 h-125 w-125 opacity-20 mix-blend-screen'>
				<svg
					viewBox='0 0 200 200'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					className='h-full w-full stroke-current stroke-[0.5]'
				>
					<circle cx='100' cy='100' r='80' />
					<path d='M100 20 L100 180' />
					<path d='M20 100 L180 100' />
					<ellipse cx='100' cy='100' rx='80' ry='30' className='animate-spin-slow origin-center' />
					<ellipse cx='100' cy='100' rx='30' ry='80' className='animate-spin-reverse origin-center' />
				</svg>
			</div>

			{/* Secondary Shape */}
			<div className='bg-primary absolute bottom-0 left-0 h-200 w-200 -translate-x-1/4 translate-y-1/2 rounded-full opacity-10 blur-3xl'></div>
		</div>
	);
};
