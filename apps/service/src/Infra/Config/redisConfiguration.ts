import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface RedisConfiguration {
  host: string;
  port: number;
  username: string;
  password: string;
}

export const redisConfiguration = registerAs('redis', () => {
  // const initialValue: RedisConfiguration = {
  //   host: '178.251.228.30',
  //   port: 31687,
  //   username: 'default',
  //   password: 'jXJCBHQq5kxyH6BPv',
  // };

  const initialValue: RedisConfiguration = {
    host: 'redis-10184.c290.ap-northeast-1-2.ec2.cloud.redislabs.com',
    username: 'default',
    port: 10184,
    password: 'lTR6rCvpPrhs5AM7t5PbMcjrAjCh4Mu8',
  };

  const schema = Joi.object<RedisConfiguration>({
    host: Joi.string().default('127.0.0.1'),
    port: Joi.number().default(6379),
    username: Joi.string().default('default'),
    password: Joi.string(),
  });

  const { error, value } = schema.validate(initialValue, { abortEarly: true, allowUnknown: false });
  if (error) throw new Error(`Validation failed - Is there an environment variable missing? ${error.message}`);
  return value;
});
