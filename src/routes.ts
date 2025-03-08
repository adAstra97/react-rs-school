import { route, type RouteConfig } from '@react-router/dev/routes';

export default [
  route('/details/:detailsId', './routes/DetailsPage.tsx'),
  route('*?', 'catchall.tsx'),
] satisfies RouteConfig;
