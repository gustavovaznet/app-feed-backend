//SERVER

//IMPORTING
import express from 'express';
import { routes } from './routes';
import cors from 'cors';

const app = express();

//APP USE
app.use(cors());
app.use(express.json());
app.use(routes);

//APP PORT
app.listen(3333, () => {
    console.log('HTTP server running!');
});
