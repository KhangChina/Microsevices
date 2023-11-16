import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import * as fs from 'fs'
import 'dotenv/config'
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
async function bootstrap() {
  let app  = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  //Cấu hình home API
  // app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.setViewEngine('hbs');
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

  //Cấu hình microservices
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    // ssl: null,
    // sasl: {
    //   mechanism: 'plain', // mechanism can be plain, scram-sha-256 or scram-sha-512
    //   username: 'kafka_user',
    //   password: 'kafka_password',
    // },
    //clientId: 'nestjs-client',
    // connectionTimeout: 4000,
    // retry: {
    //   initialRetryTime: 300,
    //   retries: 10,
    // },
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'notify-consumer',
      },
    },
  })
  //await app.startAllMicroservicesAsync();

  await app.startAllMicroservices();
  //Khởi chạy port
  await app.listen(`${process.env.PORT}`);
  console.log('😈 Server environment: ' + process.env.ENV)
  console.log('😈 Server Port: ' + process.env.PORT)
}
bootstrap();
