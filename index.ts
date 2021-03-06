import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from './config/config';

// controllers
import { home } from './controllers/home';
import { email } from './controllers/email';
import { demo } from './controllers/demo';

const app = express();
if (config.port === undefined) {
  console.error('Please check your .env file!');
  process.exit();
}
const PORT = config.port;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');

// routing
app.get('/', home);
app.post('/email', email);
app.post('/submit', demo);

// start express server
app.listen(PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`);
})

export default app;