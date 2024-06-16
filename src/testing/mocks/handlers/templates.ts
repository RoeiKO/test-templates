import { HttpResponse, http } from 'msw';

import { env } from '@/config/env';

import { db, persistDb } from '../db';
import {
  requireAuth,
  requireAdmin,
  sanitizeUser,
  networkDelay,
} from '../utils';

type TemplateBody = {
  title: string;
  body: string;
};

export const templatesHandlers = [
  http.get(`${env.API_URL}/templates`, async ({ cookies }) => {
    await networkDelay();

    try {
      const { user, error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }
      const result = db.template
        .findMany({
          where: {
            id: {
              equals: user?.id,
            },
          },
        })
        .map(({ authorId, ...template }) => {
          const author = db.user.findFirst({
            where: {
              id: {
                equals: authorId,
              },
            },
          });
          return {
            ...template,
            author: author ? sanitizeUser(author) : {},
          };
        });
      return HttpResponse.json(result);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  http.get(
    `${env.API_URL}/templates/:templateId`,
    async ({ params, cookies }) => {
      await networkDelay();

      try {
        const { user, error } = requireAuth(cookies);
        if (error) {
          return HttpResponse.json({ message: error }, { status: 401 });
        }
        const templateId = params.templateId as string;
        const template = db.template.findFirst({
          where: {
            id: {
              equals: templateId,
            },
            authorId: {
              equals: user?.id,
            },
          },
        });

        if (!template) {
          return HttpResponse.json(
            { message: 'Template not found' },
            { status: 404 },
          );
        }

        const author = db.user.findFirst({
          where: {
            id: {
              equals: template.authorId,
            },
          },
        });

        // delete template.authorId;

        const result = {
          ...template,
          author: author ? sanitizeUser(author) : {},
        };

        return HttpResponse.json(result);
      } catch (error: any) {
        return HttpResponse.json(
          { message: error?.message || 'Server Error' },
          { status: 500 },
        );
      }
    },
  ),

  http.post(`${env.API_URL}/templates`, async ({ request, cookies }) => {
    await networkDelay();

    try {
      const { user, error } = requireAuth(cookies);
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 });
      }
      const data = (await request.json()) as TemplateBody;
      requireAdmin(user);
      const result = db.template.create({
        authorId: user?.id,
        ...data,
      });
      await persistDb('template');
      return HttpResponse.json(result);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      );
    }
  }),

  http.patch(
    `${env.API_URL}/templates/:templateId`,
    async ({ request, params, cookies }) => {
      await networkDelay();

      try {
        const { user, error } = requireAuth(cookies);
        if (error) {
          return HttpResponse.json({ message: error }, { status: 401 });
        }
        const data = (await request.json()) as TemplateBody;
        const templateId = params.templateId as string;
        requireAdmin(user);
        const result = db.template.update({
          where: {
            id: {
              equals: templateId,
            },
          },
          data,
        });
        await persistDb('template');
        return HttpResponse.json(result);
      } catch (error: any) {
        return HttpResponse.json(
          { message: error?.message || 'Server Error' },
          { status: 500 },
        );
      }
    },
  ),

  http.delete(
    `${env.API_URL}/templates/:templateId`,
    async ({ cookies, params }) => {
      await networkDelay();

      try {
        const { user, error } = requireAuth(cookies);
        if (error) {
          return HttpResponse.json({ message: error }, { status: 401 });
        }
        const templateId = params.templateId as string;
        requireAdmin(user);
        const result = db.template.delete({
          where: {
            id: {
              equals: templateId,
            },
          },
        });
        await persistDb('template');
        return HttpResponse.json(result);
      } catch (error: any) {
        return HttpResponse.json(
          { message: error?.message || 'Server Error' },
          { status: 500 },
        );
      }
    },
  ),
];
