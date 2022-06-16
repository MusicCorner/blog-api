import { NestFactory } from '@nestjs/core';

import { AppModule } from '@app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  console.log('test connction');
  app.listen(3000);
};

bootstrap();
