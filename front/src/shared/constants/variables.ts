import { ERRORS, ERRORS_MESSAGE } from './types';

// Ошибка, если сервер пал
export const SERVER_ERROR = { err: { message: ERRORS_MESSAGE.server, type: ERRORS.server } };
