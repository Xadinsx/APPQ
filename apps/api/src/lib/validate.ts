import type { FastifyRequest } from 'fastify';
import type { ZodTypeAny, z } from 'zod';
import { AppError } from './errors.js';

export function parseWithSchema<T extends ZodTypeAny>(
  schema: T,
  data: unknown,
): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new AppError(400, 'VALIDATION_ERROR', 'Request validation failed', {
      issues: result.error.issues.map(issue => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }
  return result.data;
}

export function parseBody<T extends ZodTypeAny>(
  request: FastifyRequest,
  schema: T,
): z.infer<T> {
  return parseWithSchema(schema, request.body);
}

export function parseParams<T extends ZodTypeAny>(
  request: FastifyRequest,
  schema: T,
): z.infer<T> {
  return parseWithSchema(schema, request.params);
}

export function parseQuery<T extends ZodTypeAny>(
  request: FastifyRequest,
  schema: T,
): z.infer<T> {
  return parseWithSchema(schema, request.query);
}
