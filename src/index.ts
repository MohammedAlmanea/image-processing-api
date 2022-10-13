import express from 'express';
import routes from './routes/.';

const app = express();
const port = 3000;

app.use('/main', routes);

app.listen(port, () => {
  console.log(`server started at ${port}`);
});

export default app;
