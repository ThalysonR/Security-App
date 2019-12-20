import { Application } from 'express';

const routes: Array<(app: Application) => void> = [
  app =>
    app.get('/', (req, res) => {
      res.json({ response: 'Hello world' });
    }),
];

export default routes;
