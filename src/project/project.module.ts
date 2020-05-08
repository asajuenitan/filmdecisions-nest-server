import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectRepository } from './project.repository';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  providers: [ProjectService],
  controllers: [ProjectController],
  imports: [
    TypeOrmModule.forFeature([ProjectRepository]),
    MulterModule.register({
      dest: 'uploads/projects',
    }),
  ],
})
export class ProjectModule {}
