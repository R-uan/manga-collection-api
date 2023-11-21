import { createLogger, format, transports } from "winston";

const logger = createLogger({
    level: "info",
    format: format.combine(
        format.simple(),
        format.colorize({ all: true }),
        format.timestamp({ format: "YYYY-MM-DD hh:mm:ss A" }),
        format.printf((info) => `${info.level} - [${info.timestamp}] - ${info.message}`)
    ),
    transports: [
        new transports.Console({ level: "error" }),
        new transports.Console({ level: "info" }),
    ],
});

export { logger };
