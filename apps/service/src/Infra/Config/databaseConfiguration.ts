import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { MysqlConnectionCredentialsOptions } from 'typeorm/driver/mysql/MysqlConnectionCredentialsOptions';
import { DataSourceOptions } from 'typeorm';
import { SecureContextOptions } from 'node:tls';

export interface DatabaseConfiguration
  extends Omit<MysqlConnectionCredentialsOptions, 'ssl'>,
    Pick<DataSourceOptions, 'type'> {
  charset?: string;
  entityPrefix?: string;
  ssl?:
    | string
    | (Pick<SecureContextOptions, 'ca' | 'cert' | 'key' | 'ciphers' | 'maxVersion' | 'minVersion' | 'passphrase'> & {
        rejectUnauthorized?: boolean;
      });
}

export const databaseConfiguration = registerAs('database', (): DatabaseConfiguration => {
  // const initialValue: DatabaseConfiguration = {
  //   type: 'postgres',
  //   host: '178.251.228.30',
  //   port: 32088,
  //   username: 'root',
  //   password: 'jXJCBHQq5kxyH6BPv',
  //   database: 'sms',
  // };

  const initialValue: DatabaseConfiguration = {
    type: 'postgres',
    host: '139.196.89.94',
    port: 5433,
    username: 'microld',
    password: 'pBABQlyTSJZc07CX',
    database: 'db5d1d13936c3c41f782375101573714b9common',
  };

  const schema = Joi.object<DatabaseConfiguration, true>({
    type: Joi.string(),
    url: Joi.string(),
    host: Joi.string().default('127.0.0.1'),
    port: Joi.number().default(3306),
    username: Joi.string().default('root'),
    password: Joi.string().required(),
    database: Joi.string().required(),
    entityPrefix: Joi.string(),
    charset: Joi.string().default('utf8mb4_unicode_ci'),
    ssl: [Joi.string(), Joi.object()] as any,
    socketPath: Joi.string(),
  });

  const { error, value } = schema.validate(initialValue, { abortEarly: true, allowUnknown: false });
  if (error) throw new Error(`Validation failed - Is there an environment variable missing? ${error.message}`);
  return value;
});
