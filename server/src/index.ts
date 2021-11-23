import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import query from './routes/query';

import './db';
import './config/seed-data';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(cors({
    credentials: true,
    origin: '*'
}));
app.use(helmet());
app.use(query);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));