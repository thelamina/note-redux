import { useAppSelector } from '@/store';
import { PostList } from './PostList';
import { CreatePost } from './CreatePost';

export const Home = () => {
	const allPosts = useAppSelector((state) => state.post);

	return (
		<section className='text-gray-600 body-font'>
			<PostList AddPost={CreatePost} posts={allPosts} />
		</section>
	);
};
