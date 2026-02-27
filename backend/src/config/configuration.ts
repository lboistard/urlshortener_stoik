import * as Joi from "joi";

export type NodeEnv = "development";

export interface EnvVars {
  NODE_ENV: NodeEnv;
  PORT: number;
  DATABASE_URL: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  GITHUB_CALLBACK_URL?: string;
  FRONTEND_URL?: string;
  SESSION_SECRET?: string;
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
    GITHUB_CLIENT_ID: Joi.string().required(),
    GITHUB_CLIENT_SECRET: Joi.string().required(),
    GITHUB_CALLBACK_URL: Joi.string().uri().optional(),
    FRONTEND_URL: Joi.string().uri().optional(),
    SESSION_SECRET: Joi.string().min(16).optional(),
  });
