import { default as logger } from 'loglevel';
import { isDevEnv } from 'settings/env';

const level = isDevEnv ? 'trace' : 'error';
logger.setLevel(level);

export default logger;
