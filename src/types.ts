export type ReactionType = 'thumbsUp' | 'heart' | 'hooray' | 'rocket';

export type NewPostType = { title: string; content: string };

export type PostType = {
	id: string;
	title: string;
	content: string;
	date: string;
	reactions: {
		thumbsUp: number;
		hooray: number;
		heart: number;
		rocket: number;
	};
};
