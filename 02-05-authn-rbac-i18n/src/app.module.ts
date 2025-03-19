import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { I18nModule,AcceptLanguageResolver, QueryResolver, HeaderResolver} from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    BookingModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),  // Path to the translation files
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }, 
    
  ),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
