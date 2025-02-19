import { Module } from '@nestjs/common';
import { MenusModule } from './menus/menus.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [MenusModule, PrismaModule],
})
export class AppModule {}