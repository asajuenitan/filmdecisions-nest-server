import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectRepository } from './project.repository';
import { MulterModule } from '@nestjs/platform-express';
import { fileFilter } from './file-upload.filter';

@Module({
  providers: [ProjectService],
  controllers: [ProjectController],
  imports: [
    TypeOrmModule.forFeature([ProjectRepository]),
    MulterModule.register({
      dest: 'uploads/projects',
      fileFilter: fileFilter,
    }),
  ],
})
export class ProjectModule {}
