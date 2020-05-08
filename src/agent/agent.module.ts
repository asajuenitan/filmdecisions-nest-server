import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentEntity } from './agent.entity';
import { MulterModule } from '@nestjs/platform-express';
import { AgentRepository } from './agent.repository';

@Module({
  providers: [AgentService],
  controllers: [AgentController],
  imports: [
    TypeOrmModule.forFeature([AgentRepository]),
    MulterModule.register({
      dest: 'uploads/agents',
      preservePath: true,
    }),
  ],
})
export class AgentModule {}
