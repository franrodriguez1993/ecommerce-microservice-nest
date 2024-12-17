import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogUsers } from '../../database/entities/log-users.entity';
import { KafkaUserMessage } from './user-log.dto';

@Injectable()
export class UserLogService {
  constructor(
    @InjectRepository(LogUsers)
    private readonly logUserRepository: Repository<LogUsers>,
  ) {}

  async saveUserLog(data: KafkaUserMessage) {
    const log = this.logUserRepository.create({ userId: data.userId, action: data.action });

    return await this.logUserRepository.save(log);
  }

}
