import { Module } from '@nestjs/common';
import { SalesModule } from './sales/application/sales.module';
import { DatabaseModule } from './sales/infrastructure/db/database.module';

@Module({
  imports: [SalesModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
