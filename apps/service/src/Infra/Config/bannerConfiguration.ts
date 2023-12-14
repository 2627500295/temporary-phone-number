import { registerAs } from '@nestjs/config';
import { join } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import * as Joi from 'joi';

const defaultBanner: string = `

                               .__
        _____  _____   ______  |__|
       /     \\ \\__  \\  \\____ \\ |  |
      |  Y Y  \\ / __ \\_|  |_> >|  |
      |__|_|  /(____  /|   __/ |__|
            \\/      \\/ |__|

    💻 Server running at http://{{host}}:{{port}}
    Press CTRL-C to stop
`;

export const bannerConfiguration = registerAs('banner', () => {
  const bannerPath = join(__dirname, 'banner.txt');
  const isExist = existsSync(bannerPath);
  const initialValue = isExist ? readFileSync(bannerPath, { encoding: 'utf-8' }) : undefined;
  const schema = Joi.string().default(defaultBanner);
  const { error, value } = schema.validate(initialValue, { abortEarly: true, allowUnknown: false });
  if (error) throw new Error(`Validation failed - Is there an environment variable missing? ${error.message}`);
  return value;
});
