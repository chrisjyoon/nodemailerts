import express from 'express';
import morgan from 'morgan';


const app = express();
const PORT = 8000;

app.use(morgan('dev'));

// start express server
app.listen(PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`);
})

export default app;