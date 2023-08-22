import { useRouteError } from 'react-router-dom';

export const RouteError = () => {
  const error: any = useRouteError();

  return (
    <div className="font-sans relative h-screen w-full overflow-hidden">
      <div className="absolute -bottom-32 -left-32 hidden h-96 w-96 md:block">
        <svg
          viewBox="0 0 200 200"
          className="absolute h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FFDBB9"
            d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,74.1,43.2C66.7,57.2,57.6,70.6,45,78.1C32.4,85.6,16.2,87.1,0.7,85.9C-14.8,84.7,-29.6,80.9,-43.9,74.4C-58.3,67.9,-72,58.7,-79.8,45.9C-87.7,33,-89.5,16.5,-88.9,0.3C-88.4,-15.9,-85.4,-31.7,-78.1,-45.4C-70.8,-59.1,-59.1,-70.6,-45.3,-77.9C-31.6,-85.3,-15.8,-88.5,-0.3,-88.1C15.3,-87.6,30.5,-83.5,44.7,-76.4Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="relative z-20 flex h-full items-center justify-center">
        <div className="container relative mx-auto flex flex-col items-center justify-between px-6 py-4">
          <div className="flex flex-col">
            <p className="mb-6 text-center text-2xl font-medium text-gray-800 dark:text-gray-400">
              Oops! ☹️
            </p>
            <p className="mx-auto max-w-3xl py-2 text-center text-xl font-semibold ">
              Sorry, an unexpected error has occurred.
            </p>
            <h2 className="font- mx-auto max-w-3xl p-2 text-center font-medium text-status-error">
              {error.statusText || error.message}
            </h2>
            <div className="flex items-center justify-center">
              <a
                href="/"
                className="my-2 border border-gray-800 bg-transparent px-4 py-2 text-center text-base uppercase text-gray-800 dark:border-gray-400 dark:text-gray-400 md:mt-16"
              >
                Return Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
