import { ReactComponent as CheckIcon } from '@/assets/check.svg';
import { ReactComponent as CloseIcon } from '@/assets/close.svg';
import { NewPostType } from '@/types';
import { FormEvent, useState } from 'react';

type CreatePostProps = {
	onSuccess: (data: NewPostType) => void;
	onCancel: () => void;
};

export const CreatePost = ({ onSuccess, onCancel }: CreatePostProps) => {
	const [content, setContent] = useState('');
	const [title, setTitle] = useState('');

	function handleSubmit(e: FormEvent<HTMLElement>) {
		e.preventDefault();
		onSuccess({ content, title });
		setContent('');
		setTitle('');
	}

	return (
		<div className=''>
			<h2 className='pb-4 '>New Post</h2>
			<form aria-label='Create Form' onSubmit={handleSubmit}>
				<input
					placeholder='Title'
					value={title}
					className='bg-transparent font-semibold border-gray-500 p-2 mb-4 focus:outline-none border-b text-lg'
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					placeholder='Enter content'
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className='bg-transparent border-gray-500 p-4 font-light leading-loose w-full focus:outline-none border text-base'
				/>

				<div className='flex gap-1 mt-2 justify-end'>
					<button
						title='Submit'
						disabled={title.trim().length === 0}
						type='submit'
						className='disabled:opacity-20 disabled:cursor-not-allowed bg-blue-800 duration-300 hover:bg-blue-950 transition-colors text-white shadow-md text-sm w-7 h-7 flex items-center justify-center rounded p-0.5'
					>
						<CheckIcon className='w-6' />
					</button>
					<button
						title='Cancel'
						onClick={() => {
							setContent('');
							setTitle('');
							onCancel();
						}}
						className='bg-red-500 duration-300 hover:bg-red-700 transition-colors text-white shadow-md text-sm w-7 h-7 flex items-center justify-center rounded p-0.5'
					>
						<CloseIcon className='w-3' />
					</button>
				</div>
			</form>
		</div>
	);
};
