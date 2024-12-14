import { z } from 'zod';
export * from './create-task.dto';
export * from './getAll-task.dto';
export * from './getOne-task.dto';
export * from './update-task.dto';
export * from './delete-task.dto';
export * from './getByFilter-task.dto';

const baseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  status: z.string(),
  deactivate: z.boolean(),
});
export const TaskDto = {
  Create: {
    Request: {
      Body: baseSchema.pick({ title: true, description: true }),
    },
    Response: baseSchema.shape.id,
  },
  getAll: {
    Response: z.array(baseSchema),
  },
  getOne: {
    Request: {
      Param: {
        id: baseSchema.pick({ id: true }),
      },
    },
    Response: baseSchema,
  },
  update: {
    Request: {
      Body: baseSchema
        .omit({ id: true })
        .partial()
        .merge(baseSchema.pick({ id: true })),
    },
    Response: baseSchema.shape.id,
  },
  delete: {
    Request: {
      Param: {
        id: baseSchema.shape.id,
      },
    },
    Response: baseSchema.shape.id,
  },
};
const getData = async () => {
  const x = await TaskDto.update.Request.Body.spa({ id: '1' });
  console.log(x.error);
};
getData();
