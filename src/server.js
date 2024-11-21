import app from './app.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { env } from './utils/env.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();

    const PORT = Number(env('PORT', '8080'));

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
