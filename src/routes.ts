import { route, type RouteConfig } from '@react-router/dev/routes';

export default [
  route('/details/:detailsId', './pages/DetailsPage.tsx'),
] satisfies RouteConfig;
