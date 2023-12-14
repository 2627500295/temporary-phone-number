import { join } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import * as Joi from 'joi';
import { load } from 'js-yaml';

export interface YamlConfiguration {}

export function yamlConfiguration(): YamlConfiguration {
  const yamlFilePath = ['application.yaml', 'application.yml'].map((item) => join(__dirname, item)).find(existsSync);
  const initialValue: YamlConfiguration = !yamlFilePath ? {} : load(readFileSync(yamlFilePath, 'utf8'));
  const schema = Joi.object<YamlConfiguration>({});
  const { error, value } = schema.validate(initialValue, { abortEarly: true, allowUnknown: false });
  if (error) throw new Error(`Validation failed - Is there an environment variable missing? ${error.message}`);
  return value;
}
