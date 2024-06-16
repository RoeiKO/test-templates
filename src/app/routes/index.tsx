import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ProtectedRoute } from '@/lib/authorization';

import { templateLoader } from './app/templates/template.loader';
import { templatesLoader } from './app/templates/templates.loader';
import { AppRoot } from './app/root';

export const createRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/app" replace />,
    },
    {
      path: '/auth/register',
      lazy: async () => {
        const { RegisterRoute } = await import('./auth/register');
        return { Component: RegisterRoute };
      },
    },
    {
      path: '/auth/login',
      lazy: async () => {
        const { LoginRoute } = await import('./auth/login');
        return { Component: LoginRoute };
      },
    },
    {
      path: '/app',
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      children: [
        {
          path: 'templates',
          lazy: async () => {
            const { TemplatesRoute } = await import(
              './app/templates/templates'
            );
            return { Component: TemplatesRoute };
          },
          loader: templatesLoader(queryClient),
        },
        {
          path: 'templates/:templateId',
          lazy: async () => {
            const { TemplateRoute } = await import(
              './app/templates/template'
            );
            return { Component: TemplateRoute };
          },
          loader: templateLoader(queryClient),
        },
        {
          path: '',
          lazy: async () => {
            const { DashboardRoute } = await import('./app/dashboard');
            return { Component: DashboardRoute };
          },
        },
      ],
    },
    {
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('./not-found');
        return { Component: NotFoundRoute };
      },
    },
  ]);
