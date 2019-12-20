import { Application } from 'express';

const routes: Array<(app: Application) => void> = [app => app.post()];
export default routes;
