import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface ClusterConfiguration {
  host: string;
  port: number;
}

export const clusterConfiguration = registerAs('cluster', (): ClusterConfiguration => {
  const initialValue = {
    host: process.env.HOST,
    port: process.env.PORT,
  };

  const schema = Joi.object<ClusterConfiguration>({
    host: Joi.string().valid('localhost', '127.0.0.1', '0.0.0.0', '::1', '::0', '::').default('0.0.0.0'),
    port: Joi.number().default(8080),
  });

  const { error, value } = schema.validate(initialValue, { abortEarly: true, allowUnknown: false });
  if (error) throw new Error(`Validation failed - Is there an environment variable missing? ${error.message}`);
  return value;
});
