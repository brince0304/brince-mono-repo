import type { z } from 'zod';

export type InferZodType<T extends z.ZodType> = z.infer<T>;
