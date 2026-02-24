import * as Joi from "joi";

export type NodeEnv = "development";

export interface EnvVars {
  NODE_ENV: NodeEnv;
  PORT: number;
  DATABASE_URL: string;
}

export const envValidationSchema: Joi.ObjectSchema<EnvVars> =
  Joi.object<EnvVars>({
    NODE_ENV: Joi.string()
      .valid("development", "test", "production")
      .required(),
    PORT: Joi.number().port().default(3000),
    DATABASE_URL: Joi.string()
      .uri({ scheme: ["postgres", "postgresql"] })
      .required(),
  });
