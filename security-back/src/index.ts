import express, { Application } from 'express';
import cors from 'cors';
import { registerHandlers } from './controllers';
import auth from './config/auth';

const app: Application = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(auth().initialize());
registerHandlers(app);

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});
