import { Spinner } from '@/components/Elements';
import { Suspense } from 'react';
import { useOutlet } from 'react-router-dom';

export const RootApp = () => {
	const outlet = useOutlet();

	return (
		<main className='dark:text-slate-200'>
			<div className=' max-w-screen-2xl mx-auto'>
				<Suspense fallback={<Spinner />}>{outlet}</Suspense>
			</div>
		</main>
	);
};
