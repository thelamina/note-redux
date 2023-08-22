import { ReactComponent as CheckIcon } from '@/assets/check.svg';
import { ReactComponent as CloseIcon } from '@/assets/close.svg';
import { ReactComponent as EditIcon } from '@/assets/edit.svg';
import { NewPostType, PostType, ReactionType } from '@/types';
import { FormEvent, useState } from 'react';

type Props = {
	data: PostType;
	onRemove: () => void;
	onReact: (reaction: ReactionType) => void;
	onUpdate: (data: NewPostType) => void;
};

const reactionEmoji: Record<ReactionType, string> = {
	thumbsUp: '👍',
	heart: '❤️',
	rocket: '🚀',
	hooray: '🎉',
};

export const Post = ({ data, onRemove, onReact, onUpdate }: Props) => {
	const [canEdit, setCanEdit] = useState(false);
	const [title, setTitle] = useState(data.title);
	const [content, setContent] = useState(data.content);

	function handleUpdate(e: FormEvent<HTMLElement>) {
		e.preventDefault();
		onUpdate({ content, title });
		setCanEdit(false);
	}

	return (
		<div className='w-full relative transition-shadow duration-300 p-4 rounded-md'>
			<div className=' flex items-center justify-between'>
				<p className='pb-2 text-xs text-gray-500 '>
					{new Date(data?.date).toLocaleString(undefined, {
						dateStyle: 'medium',
						timeStyle: 'short',
						hour12: true,
					})}
				</p>
			</div>
			{canEdit ? (
				<div className='w-full relative duration-300 '>
					<form aria-label='Create Form' onSubmit={handleUpdate}>
						<input
							placeholder='Title'
							className='bg-transparent font-semibold border-gray-500 p-2 mb-4 focus:outline-none border-b text-lg'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<textarea
							placeholder='Enter content'
							value={content}
							rows={4}
							onChange={(e) => setContent(e.target.value)}
							className='bg-transparent border-gray-500 p-4 font-light leading-loose w-full focus:outline-none border text-base'
						/>
						<div className='flex gap-1 justify-end'>
							<button
								type='submit'
								title='Submit'
								className='bg-blue-800 hover:bg-blue-950 transition-colors text-white shadow-md text-sm w-7 h-7 flex items-center justify-center rounded p-0.5'
							>
								<CheckIcon className='w-6' />
							</button>
							<button
								title='Cancel'
								onClick={() => {
									setTitle(data.title);
									setContent(data.content);
									setCanEdit(false);
								}}
								className='bg-red-500 text-white shadow-md text-sm w-7 h-7 flex items-center justify-center rounded p-0.5'
							>
								<CloseIcon className='w-3' />
							</button>
						</div>
					</form>
				</div>
			) : (
				<div className='w-full relative gap-2 duration-300'>
					<p className='pb-4 text-lg font-semibold'>{data.title}</p>
					<div className='inline-block font-sans pb-4 font-light'>
						{data.content}
					</div>
					<div className='flex gap-4 justify-between flex-wrap'>
						<div className='flex gap-2'>
							{Object.entries(reactionEmoji).map(
								([name, emoji]) => {
									return (
										<button
											key={name}
											type='button'
											className='text-sm border p-0.5 text-gray-700'
											onClick={() =>
												onReact(name as ReactionType)
											}
										>
											{emoji}{' '}
											{
												data.reactions[
													name as ReactionType
												]
											}
										</button>
									);
								}
							)}
						</div>
						<div className='flex gap-4'>
							<button
								title='Edit'
								onClick={() => setCanEdit(true)}
								className='rounded-md hover:opacity-70 transition-opacity text-indigo-700 text-sm flex gap-1 items-center justify-center'
							>
								<EditIcon className='w-3' />
								Edit
							</button>
							<button
								onClick={() => onRemove()}
								title='Remove'
								className='cursor-pointer hover:opacity-70 transition-opacity gap-1 text-red-700 text-sm flex items-center justify-center '
							>
								<CloseIcon className='w-2.5' />
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
