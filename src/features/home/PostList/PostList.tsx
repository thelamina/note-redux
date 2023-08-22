import { Post } from '../Post';
import { useAppDispatch } from '@/store';
import {
	removePost,
	addReaction,
	updatePost,
	addPost,
} from '@/store/postSlice';
import { NewPostType, PostType } from '@/types';
import { useState } from 'react';

type Props = {
	posts: PostType[];
	AddPost?: (props: {
		onSuccess: (data: NewPostType) => void;
		onCancel: () => void;
	}) => JSX.Element;
};

export const PostList = ({ posts, AddPost }: Props) => {
	const [create, setCreate] = useState(false);
	const dispatch = useAppDispatch();

	function handleCreate(data: NewPostType) {
		dispatch(addPost(data));
		setCreate(false);
	}

	return (
		<>
			<div className=' bg-gray-300 sm:p-6 p-4'>
				{!create ? (
					<div className='flex items-center justify-between max-w-screen-lg mx-auto '>
						<h4 className='text-xl font-bold'>ALL POSTS</h4>
						<button onClick={() => setCreate(true)}>
							New Post
						</button>
					</div>
				) : (
					<div className='max-w-screen-md mx-auto '>
						{AddPost && (
							<AddPost
								onCancel={() => setCreate(false)}
								onSuccess={handleCreate}
							/>
						)}
					</div>
				)}
			</div>
			<div className='max-w-screen-lg mx-auto sm:p-6 p-4 rounded-md w-full h-full'>
				<div className='pb-4'>
					{posts.length > 0 ? (
						<ul className='space-y-2 mb-4'>
							{posts?.map((post) => (
								<li key={post.id} className='border-b'>
									<Post
										data={post}
										onReact={(reaction) => {
											dispatch(
												addReaction({
													postId: post.id,
													reaction,
												})
											);
										}}
										onUpdate={(data) => {
											dispatch(
												updatePost({
													id: post.id,
													...data,
												})
											);
										}}
										onRemove={() => {
											dispatch(
												removePost({ id: post.id })
											);
										}}
									/>
								</li>
							))}
						</ul>
					) : (
						<p
							role='alert'
							className='p-6 mb-4 text-center text-sm font-medium'
						>
							There are no posts
						</p>
					)}
				</div>
			</div>
		</>
	);
};
