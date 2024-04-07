import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import routes from './routes/user.js';
import notFoundMiddleware from './middleware/not-found.js'

dotenv.config();

async function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  
  await connectDB();

  app.use('/api/v1/user', routes);

  app.use(notFoundMiddleware);

  return app;
}

const PORT = process.env.PORT || 3000;

async function addStart(){
    createServer()
    .then((server) => {
      server.listen(PORT);
      console.info(`Server started on http://localhost:${PORT}`);
    })
    .catch((err) => {
      console.error('Startup failure.', { error: err });
      process.exit(1);
    });
}

addStart();

export default createServer;
