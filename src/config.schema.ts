import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  STAGE: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_HOST: Joi.string().required(),
  SECRET_KEY: Joi.string().required(),
  PORT: Joi.number().default(4000),
});
