import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import { NewPostType, PostType, ReactionType } from '../types';

const initialState = [
	{
		id: '1',
		title: 'First Post!',
		content:
			' Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet officiis maxime est exercitationem cupiditate quae perferendis repellendus repellat. Inventore nam recusandae ipsam adipisci totam, quibusdam a hic veniam corporis accusamus ea, quae molestiae? Corporis deleniti similique ullam voluptatem neque? Labore deleniti non commodi neque dolorum?',
		date: sub(new Date(), { minutes: 10 }).toISOString(),
		reactions: {
			thumbsUp: 0,
			hooray: 0,
			heart: 0,
			rocket: 0,
		},
	},
	{
		id: '2',
		title: 'Second Post',
		content: 'More text',
		date: sub(new Date(), { minutes: 5 }).toISOString(),
		reactions: {
			thumbsUp: 0,
			hooray: 0,
			heart: 0,
			rocket: 0,
		},
	},
];

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		addPost: (state, action: PayloadAction<NewPostType>) => {
			const { title, content } = action.payload;

			const newPost: PostType = {
				id: nanoid(),
				date: new Date().toISOString(),
				title,
				content,
				reactions: {
					thumbsUp: 0,
					hooray: 0,
					heart: 0,
					rocket: 0,
				},
			};
			state.push(newPost);
			return state;
		},

		addReaction: (
			state,
			action: PayloadAction<{ postId: string; reaction: ReactionType }>
		) => {
			const { postId, reaction } = action.payload;
			const existingPost = state.find((post) => post.id === postId);

			if (existingPost) {
				existingPost.reactions[reaction]++;
			}
		},

		updatePost: (
			state,
			action: PayloadAction<{ id: string } & NewPostType>
		) => {
			const { id, title, content } = action.payload;
			const existingPost = state.find((post) => post.id === id);

			if (existingPost) {
				const noteIndex = state.indexOf(existingPost);
				const newPosts = [
					...state.slice(0, noteIndex),
					{ ...existingPost, title, content },
					...state.slice(noteIndex + 1),
				];

				return newPosts;
			}
		},

		removePost: (state, action: PayloadAction<{ id: string }>) => {
			const { id } = action.payload;
			const newState = state.filter((post) => post.id !== id);
			return newState;
		},
	},
});

export const { addPost, updatePost, removePost, addReaction } =
	postsSlice.actions;

export default postsSlice.reducer;
