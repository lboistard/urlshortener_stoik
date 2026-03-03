import { LoggerService } from "@nestjs/common";
import pino from "pino";

const pinoLogger = pino({
  transport: { target: "pino-pretty", options: { colorize: true } },
});

export { pinoLogger };

export class PinoLogger implements LoggerService {
  log(message: unknown, ...optionalParams: unknown[]) {
    pinoLogger.info(
      optionalParams.length ? { msg: message, ...optionalParams } : message,
    );
  }

  error(message: unknown, ...optionalParams: unknown[]) {
    pinoLogger.error(
      optionalParams.length ? { msg: message, ...optionalParams } : message,
    );
  }

  warn(message: unknown, ...optionalParams: unknown[]) {
    pinoLogger.warn(
      optionalParams.length ? { msg: message, ...optionalParams } : message,
    );
  }

  debug(message: unknown, ...optionalParams: unknown[]) {
    pinoLogger.debug(
      optionalParams.length ? { msg: message, ...optionalParams } : message,
    );
  }

  verbose(message: unknown, ...optionalParams: unknown[]) {
    pinoLogger.trace(
      optionalParams.length ? { msg: message, ...optionalParams } : message,
    );
  }
}
