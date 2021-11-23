import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import search from './routes/search';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(cors({
    credentials: true,
    origin: '*'
}));
app.use(helmet());
app.use(search);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));