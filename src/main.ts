import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
    dotenv.config();

    const app = await NestFactory.create(AppModule);
    app.enableCors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' });

    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Backend corriendo en http://localhost:${port}`);
}
bootstrap();
