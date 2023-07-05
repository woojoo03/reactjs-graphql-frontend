import { ActionFunction, createBrowserRouter, LoaderFunction } from 'react-router-dom';
import { Error404 } from '@/components/sections/error/Error404';
import { AuthGuardLayout, PrivateRoute } from '@/components/layouts';

export interface RouteCommon {
	loader?: LoaderFunction;
	action?: ActionFunction;
	ErrorBoundary?: React.ComponentType<any>;
}

export interface IRoute extends RouteCommon {
	path: string;
	Element: React.ComponentType<any>;
}

export interface Pages {
	[key: string]: {
		default: React.ComponentType<any>;
	} & RouteCommon;
}

// 로그인 필요 없는 페이지 경로
const publicPages = ['/login', '/join'];

export const getRouter = (pages: Pages) => {
	console.log('getRouter --------------------------------------------');
	const routes: IRoute[] = [];

	for (const path of Object.keys(pages)) {
		const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
		if (!fileName) continue;

		const normalizedPathName = fileName.includes('$') ? fileName.replace('$', ':') : fileName.replace(/\/index/, '');

		routes.push({
			path: fileName === 'index' ? '/' : `/${normalizedPathName.toLowerCase()}`,
			Element: pages[path].default,
			loader: pages[path]?.loader as LoaderFunction | undefined,
			action: pages[path]?.action as ActionFunction | undefined,
			ErrorBoundary: pages[path]?.ErrorBoundary,
		});
	}
	console.log('routes :', routes);

	return createBrowserRouter(
		routes.map(({ Element, ErrorBoundary, ...rest }) => {
			let element;

			// 메인 페이지..
			if (rest.path === '/') {
				element = <Element />;
			}
			// 로그인 필요 없는 페이지..
			else if (publicPages.indexOf(rest.path) > -1) {
				element = (
					<PrivateRoute>
						<Element />
					</PrivateRoute>
				);
			}
			// 로그인 필요한 페이지..
			else {
				element = (
					<AuthGuardLayout>
						<Element />
					</AuthGuardLayout>
				);
			}

			return {
				...rest,
				element: element,
				errorElement: <Error404 id={0} loading={true} />,
			};
		}),
	);
};
