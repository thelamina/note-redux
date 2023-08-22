import {
	RouterProvider,
	RouteObject,
	createBrowserRouter,
} from 'react-router-dom';
import { RouteError } from '@/components/Error';
import { Spinner } from '@/components/Elements';
import { RootApp } from './Root';
import { Home } from '@/features';

export const AppRouter = () => {
	const router = createBrowserRouter(routesList);
	return <RouterProvider router={router} fallbackElement={<Spinner />} />;
};

const routesList: RouteObject[] = [
	{
		path: '',
		element: <RootApp />,
		errorElement: <RouteError />,
		children: [
			{
				index: true,
				element: <Home />,
			},
		],
	},
];
