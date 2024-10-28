import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserContactModule } from './modules/user-contact/user-contact.module';
import { CacheModule } from '@nestjs/cache-manager';
import { LoggerMiddleware } from './core/service/midleware.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
          options: {
            host: configService.get<string>('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT') ?? 6379,
          },
          ttl: 86400
        }),
        inject: [ConfigService],
    }),
    UserContactModule
  ],
  controllers: [AppController],
  providers: [AppService, LoggerMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Terapkan untuk semua rute
  }
}
