import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import * as fs from 'fs'
import 'dotenv/config'
async function bootstrap() {
  const app : any = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  //Cấu hình home API
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  //Cấu hình thông tin swagger API
  const config = new DocumentBuilder()
    .setTitle('HTG.Notification Server API')
    .setDescription('Microservices Notification (OTP - SMS - Call - Socket)')
    .setVersion('1.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();
  //Apply cấu hình vào swagger
  const document = SwaggerModule.createDocument(app, config);
  const options = {
    explorer: false,
    customCss: fs.readFileSync(join(__dirname, '..', 'public/theme-swagger-3/theme-feeling-blue.css'), 'utf8'),
    customSiteTitle: 'API Documentation',
    customfavIcon: 'favicon.png',
  };
  //Cấu hình đường dẫn đến api document
  SwaggerModule.setup('api-document', app, document, options);
  //Khởi chạy port
  await app.listen(`${process.env.PORT}`);
  console.log('😈 Server environment: ' + process.env.ENV)
  console.log('😈 Server Port: ' + process.env.PORT)
}
bootstrap();
