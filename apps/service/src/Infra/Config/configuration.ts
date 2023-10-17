import { existsSync, readFileSync } from 'node:fs';
import { SecureContextOptions } from 'node:tls';
import { join } from 'node:path';

import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { load } from 'js-yaml';

import { MysqlConnectionCredentialsOptions } from 'typeorm/driver/mysql/MysqlConnectionCredentialsOptions';
import { DataSourceOptions } from 'typeorm';

const defaultBanner = `

                               .__
        _____  _____   ______  |__|
       /     \\ \\__  \\  \\____ \\ |  |
      |  Y Y  \\ / __ \\_|  |_> >|  |
      |__|_|  /(____  /|   __/ |__|
            \\/      \\/ |__|

    💻 Server running at http://{{host}}:{{port}}
    Press CTRL-C to stop
`;

export interface YamlConfiguration {}

export interface ClusterConfiguration {
  host: string;
  port: number;
}

export interface DatabaseConfiguration
  extends Omit<MysqlConnectionCredentialsOptions, 'ssl'>,
    Pick<DataSourceOptions, 'type'> {
  charset?: string;
  entityPrefix?: string;
  ssl?:
    | string
    | (Pick<
        SecureContextOptions,
        | 'ca'
        | 'cert'
        | 'key'
        | 'ciphers'
        | 'maxVersion'
        | 'minVersion'
        | 'passphrase'
      > & {
        rejectUnauthorized?: boolean;
      });
}

export interface RedisConfiguration {
  host: string;
  port: number;
  username: string;
  password: string;
}

export interface GlobalConfiguration {}

const databaseJoiSchema = Joi.object<DatabaseConfiguration, true>({
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

const redisJoiSchema = Joi.object<RedisConfiguration>({
  host: Joi.string().default('127.0.0.1'),
  port: Joi.number().default(6379),
  username: Joi.string().default('default'),
  password: Joi.string(),
});

export const bannerConfiguration = registerAs('banner', () => {
  const bannerPath = join(__dirname, 'banner.txt');

  const isExist = existsSync(bannerPath);

  const initialValue = isExist
    ? readFileSync(bannerPath, { encoding: 'utf-8' })
    : undefined;

  const schema = Joi.string<YamlConfiguration>().default(defaultBanner);

  const { error, value } = schema.validate(initialValue, {
    abortEarly: true,
    allowUnknown: false,
  });

  if (error) {
    throw new Error(
      `Validation failed - Is there an environment variable missing?
        ${error.message}`,
    );
  }

  return value;
});

export const clusterConfiguration = registerAs(
  'cluster',
  (): ClusterConfiguration => {
    const initialValue = {
      host: process.env.HOST,
      port: process.env.PORT,
    };

    const schema = Joi.object<ClusterConfiguration>({
      host: Joi.string()
        .valid('localhost', '127.0.0.1', '0.0.0.0', '::1', '::0', '::')
        .default('0.0.0.0'),
      port: Joi.number().default(8080),
    });

    const { error, value } = schema.validate(initialValue, {
      abortEarly: true,
      allowUnknown: false,
    });

    if (error) {
      throw new Error(
        `Validation failed - Is there an environment variable missing?
        ${error.message}`,
      );
    }

    return value;
  },
);

export const databaseConfiguration = registerAs(
  'database',
  (): DatabaseConfiguration => {
    const initialValue: DatabaseConfiguration = {
      type: 'postgres',
      host: '178.251.228.30',
      port: 32088,
      username: 'root',
      password: 'jXJCBHQq5kxyH6BPv',
      database: 'sms',
    };

    const { error, value } = databaseJoiSchema.validate(initialValue, {
      abortEarly: true,
      allowUnknown: false,
    });

    if (error) {
      throw new Error(
        `Validation failed - Is there an environment variable missing?
        ${error.message}`,
      );
    }

    return value;
  },
);

export const redisConfiguration = registerAs('redis', () => {
  const initialValue: RedisConfiguration = {
    host: '178.251.228.30',
    port: 31687,
    username: 'default',
    password: 'jXJCBHQq5kxyH6BPv',
  };

  const { error, value } = redisJoiSchema.validate(initialValue, {
    abortEarly: true,
    allowUnknown: false,
  });

  if (error) {
    throw new Error(
      `Validation failed - Is there an environment variable missing?
        ${error.message}`,
    );
  }

  return value;
});

export function globalConfiguration(): GlobalConfiguration {
  const initialValue: GlobalConfiguration = {};

  const schema = Joi.object<GlobalConfiguration, true>({});

  const { error, value } = schema.validate(initialValue, {
    abortEarly: true,
    allowUnknown: false,
  });

  if (error) {
    throw new Error(
      `Validation failed - Is there an environment variable missing?
        ${error.message}`,
    );
  }

  return value;
}

export function yamlConfiguration(): YamlConfiguration {
  const yamlFilePath = ['application.yaml', 'application.yml']
    .map((item) => join(__dirname, item))
    .find(existsSync);

  const initialValue: YamlConfiguration = !yamlFilePath
    ? {}
    : load(readFileSync(yamlFilePath, 'utf8'));

  const schema = Joi.object<YamlConfiguration>({});

  const { error, value } = schema.validate(initialValue, {
    abortEarly: true,
    allowUnknown: false,
  });

  if (error) {
    throw new Error(
      `Validation failed - Is there an environment variable missing?
        ${error.message}`,
    );
  }

  return value;
}
