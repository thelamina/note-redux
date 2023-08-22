import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

interface Breed {
	id: string;
	name: string;
	image: {
		url: string;
	};
}

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: API_BASE_URL,
		prepareHeaders(headers) {
			return headers;
		},
	}),
	endpoints(builder) {
		return {
			fetchAllCharacters: builder.query<Breed[], number | void>({
				query() {
					return `/characters`;
				},
			}),
		};
	},
});

export const { useFetchAllCharactersQuery } = apiSlice;
