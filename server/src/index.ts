import express from 'express';
import cors from 'cors';
import searchRoutes from './routes/searchRoutes';

const app = express();

app.use(cors());

app.use('/search', searchRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});