import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/user.entity';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { ProjectEntity } from './project/project.entity';
import { AgentModule } from './agent/agent.module';
import { AgentEntity } from './agent/agent.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url:
        'mongodb+srv://x1k:hero@cluster0-gznkd.gcp.mongodb.net/test?retryWrites=true&w=majority',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      entities: [User, ProjectEntity, AgentEntity],
    }),
    UserModule,
    ProjectModule,
    AgentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
