'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const gears = [
	{
		svg: (
			<svg width="80" height="80" viewBox="0 0 81 80.5" fill="none">
				<path
					d="M30.3,68.2c1.2,0.2,2.3,0.9,3.8,1.2c1.6,0.3,2.7,0.6,4,0.4l4.9,9.6c0.6,0.9,1.4,1.1,2.3,0.9l15.3-4.9
            c0.5-0.3,1-1,0.9-2.3l-1.8-10.6c2-1.6,3.6-3.7,5.3-5.8l10.5,0.6c1.1,0.6,2.1-0.4,2.3-1.1L81,40.7c0.2-0.8-0.4-2.1-1.1-2.3l-10.2-3.8
            c-0.3-2.5-1.4-4.8-2.5-7.5l5.9-8.5c0.6-1.1,0.4-1.9-0.2-2.9l-12-10.7c-0.3-0.5-1.6-0.3-2.5,0.3l-8,6.9c-1.2-0.2-2.3-0.9-3.8-1.2
            c-1.6-0.3-2.7-0.6-4-0.4L37.7,1c-0.6-0.9-1.4-1.1-2.3-0.9L20.1,5c-0.5,0.3-1,1-0.9,2.3l1.8,10.6c-2,1.6-3.6,3.7-5.3,5.8L5.3,23
            c-0.8-0.2-1.7,0.4-2,1.6L0,40.2c-0.2,0.8,0.4,2.1,1.1,2.3l9.8,3.7c0.7,2.6,1.4,5.2,2.5,7.5l-6,8.9c-0.6,0.7-0.4,2,0.3,2.5l12,10.7
            c0.7,0.5,1.9,0.8,2.4,0.1L30.3,68.2z M26.7,37.3c1.6-7.4,9.1-12.3,16.5-10.8S55.6,35.7,54,43.1c-1.6,7.4-9.1,12.3-16.5,10.7
            C30.1,52.3,25.1,44.7,26.7,37.3L26.7,37.3z"
					fill="#383838"
				/>
			</svg>
		),
		style: {
			width: 80,
			height: 80,
			left: -14,
			top: 10,
			animation: 'spinOne 1.5s linear infinite',
			zIndex: 2,
		},
	},
	{
		svg: (
			<svg width="100" height="100" viewBox="0 0 103 103.7" fill="none">
				<path
					d="M87.3,64.8c0.3-1.5,1.1-2.9,1.6-4.9c0.4-2,0.7-3.5,0.5-5.1l12.3-6.3c1.2-0.8,1.4-1.8,1.1-2.9l-6.3-19.6
            c-0.4-0.6-1.3-1.3-2.9-1.1l-13.5,2.3c-2.1-2.5-4.7-4.7-7.4-6.8l0.8-13.4C74.3,5.8,73,4.5,72,4.3L52.1,0c-1-0.2-2.7,0.5-2.9,1.5
            l-4.8,13c-3.2,0.4-6.1,1.8-9.5,3.2l-10.9-7.5c-1.4-0.8-2.5-0.5-3.7,0.3L6.5,25.8c-0.6,0.4-0.4,2,0.4,3.2l8.8,10.2
            c-0.3,1.5-1.1,2.9-1.5,4.9c-0.4,2-0.7,3.5-0.6,5.1L1.2,55.4c-1.2,0.8-1.4,1.8-1.1,2.9l6.3,19.6c0.4,0.6,1.3,1.3,2.9,1.1l13.5-2.3
            c2.1,2.5,4.7,4.7,7.4,6.8l-0.8,13.4c-0.2,1,0.6,2.2,2.1,2.5l20,4.2c1,0.2,2.7-0.5,2.9-1.5l4.7-12.6c3.3-0.9,6.6-1.7,9.5-3.2
            L80.1,94c0.9,0.7,2.5,0.5,3.2-0.4L97,78.3c0.7-0.9,1-2.4,0.1-3.1L87.3,64.8z M47.8,69.5C38.3,67.5,32,57.8,34,48.3
            c2-9.5,11.7-15.8,21.2-13.8c9.5,2,15.7,11.7,13.7,21.2C66.9,65.2,57.3,71.5,47.8,69.5L47.8,69.5z"
					fill="#F6921E"
				/>
			</svg>
		),
		style: {
			width: 100,
			height: 100,
			left: 60,
			top: 10,
			animation: 'spinTwo 2s linear infinite',
			zIndex: 1,
		},
	},
	{
		svg: (
			<svg width="80" height="80" viewBox="0 0 81 80.5" fill="none">
				<path
					d="M30.3,68.2c1.2,0.2,2.3,0.9,3.8,1.2c1.6,0.3,2.7,0.6,4,0.4l4.9,9.6c0.6,0.9,1.4,1.1,2.3,0.9l15.3-4.9
            c0.5-0.3,1-1,0.9-2.3l-1.8-10.6c2-1.6,3.6-3.7,5.3-5.8l10.5,0.6c1.1,0.6,2.1-0.4,2.3-1.1L81,40.7c0.2-0.8-0.4-2.1-1.1-2.3l-10.2-3.8
            c-0.3-2.5-1.4-4.8-2.5-7.5l5.9-8.5c0.6-1.1,0.4-1.9-0.2-2.9l-12-10.7c-0.3-0.5-1.6-0.3-2.5,0.3l-8,6.9c-1.2-0.2-2.3-0.9-3.8-1.2
            c-1.6-0.3-2.7-0.6-4-0.4L37.7,1c-0.6-0.9-1.4-1.1-2.3-0.9L20.1,5c-0.5,0.3-1,1-0.9,2.3l1.8,10.6c-2,1.6-3.6,3.7-5.3,5.8L5.3,23
            c-0.8-0.2-1.7,0.4-2,1.6L0,40.2c-0.2,0.8,0.4,2.1,1.1,2.3l9.8,3.7c0.7,2.6,1.4,5.2,2.5,7.5l-6,8.9c-0.6,0.7-0.4,2,0.3,2.5l12,10.7
            c0.7,0.5,1.9,0.8,2.4,0.1L30.3,68.2z M26.7,37.3c1.6-7.4,9.1-12.3,16.5-10.8S55.6,35.7,54,43.1c-1.6,7.4-9.1,12.3-16.5,10.7
            C30.1,52.3,25.1,44.7,26.7,37.3L26.7,37.3z"
					fill="#383838"
				/>
			</svg>
		),
		style: {
			width: 80,
			height: 80,
			left: 140,
			top: -30,
			animation: 'spinOne 1.5s linear infinite',
			zIndex: 3,
		},
	},
];

export default function GearAnimation() {
    useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, []);

	return (
		<div>
			<div
				style={{
					position: 'relative',
					width: 220,
					height: 120,
					margin: '2rem auto',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{gears.map((gear, i) => (
					<div
						key={i}
						style={{
							position: 'absolute',
							...gear.style,
						}}
					>
						{gear.svg}
					</div>
				))}
				<style>{`
					@keyframes spinOne {
						0% { transform: rotate(0deg);}
						100% { transform: rotate(-360deg);}
					}
					@keyframes spinTwo {
						0% { transform: rotate(0deg);}
						100% { transform: rotate(360deg);}
					}
				`}</style>
			</div>
			<div className="relative z-10 flex flex-col items-center justify-center px-24 text-center text-white gap-1">
				<h1 className="mb-2 text-4xl font-bold">503 - Service Unavailable</h1>
				<p className="mb-6 text-lg">We're currently updating our systems in this page. We'll be back shortly!</p>
				<Link href="/" passHref>
					<Button className="bg-lime-400 text-black font-medium rounded-lg px-6 py-2.5 hover:bg-lime-300 hover:shadow-md hover:scale-[1.02] transition-all">
						Go Back Home
					</Button>
				</Link>
			</div>
		</div>
	);
}