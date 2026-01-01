// Lazy-loaded pages for better performance
import { lazy } from 'react';

export const Home = lazy(() => import('./Home/Home'));
export const Login = lazy(() => import('./Login/Login'));
export const Single = lazy(() => import('./Single/Single'));
export const SelectCity = lazy(() => import('./SelectCity/SelectCity'));
export const Dashboard = lazy(() => import('./Dashboard/Dashboard'));
export const NewPost = lazy(() => import('./NewPost/NewPost'));