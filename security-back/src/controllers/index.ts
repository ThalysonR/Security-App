import root from './root';
import { Application } from 'express';

export function registerHandlers(app: Application) {
  const handlers: Array<(app: Application) => void> = [];
  handlers.concat(root).forEach(handler => handler(app));
}
