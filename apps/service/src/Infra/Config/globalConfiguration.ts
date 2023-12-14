import * as Joi from 'joi';

export interface GlobalConfiguration {}

export function globalConfiguration(): GlobalConfiguration {
  const initialValue: GlobalConfiguration = {};
  const schema = Joi.object<GlobalConfiguration, true>({});
  const { error, value } = schema.validate(initialValue, { abortEarly: true, allowUnknown: false });
  if (error) {
    throw new Error(`Validation failed - Is there an environment variable missing? ${error.message}`);
  }
  return value;
}
