import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MenusModule } from './menus/menus.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [MenusModule, PrismaModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}