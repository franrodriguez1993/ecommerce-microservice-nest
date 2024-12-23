import { Module } from '@nestjs/common';
import { HashService } from './hash.service';
import JWTService from './jwt.service';

@Module({ providers: [HashService,JWTService] })
export class UtilsModule {}
