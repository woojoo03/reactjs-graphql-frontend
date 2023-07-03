import { ActionFunction, createBrowserRouter, LoaderFunction } from 'react-router-dom';
import { Error404 } from '@/components/sections/Error404';
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

export const getRouter = (pages: Pages) => {
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
      console.log('path :', rest.path);

      let element = <AuthGuardLayout><Element/></AuthGuardLayout>;
      // 로그인 필요없는 페이지..
      if (rest.path === '/login') {
        element = <PrivateRoute><Element/></PrivateRoute>;
      }

      return {
        ...rest,
        element: element,
        errorElement: <Error404 id={0} loading={true}/>,
      };
    })
  );
};
