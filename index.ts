import express from 'express';
import morgan from 'morgan';

// controllers
import home from './controllers/home';
import email from './controllers/email';

const app = express();
const PORT = 8000;

app.use(morgan('dev'));

// routing
app.get('/', home);
app.post('/email', email);

// start express server
app.listen(PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`);
})

export default app;