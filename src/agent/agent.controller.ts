import {
  Controller,
  UseGuards,
  Get,
  Param,
  Post,
  UseInterceptors,
  Body,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AgentService } from './agent.service';
import { AgentEntity } from './agent.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAgentDto } from './dto/create-agent.dto';
import { Roles } from 'src/auth/roles.decorator';

@Controller('agents')
@UseGuards(AuthGuard('jwt'))
export class AgentController {
  constructor(private agentService: AgentService) {}

  @Get()
  async getAllAgents(): Promise<AgentEntity[]> {
    return await this.agentService.getAllAgents();
  }

  @Roles('admin')
  @Get('user/:id/agents')
  async getAllAgentsByUserId(@Param('id') id: string): Promise<AgentEntity[]> {
    return await this.agentService.getAgentsByUserId(id);
  }

  @Get('my-agents')
  async getAgentsByLoggedInUser(@GetUser() user: User): Promise<AgentEntity[]> {
    return await this.agentService.getAgentsByLoggedInUser(user);
  }

  @Get(':id')
  async getAgentById(@Param('id') id: string): Promise<AgentEntity> {
    return await this.agentService.getAgentById(id);
  }

  @Post('create')
  @UseInterceptors(
    FileInterceptor('profilePic', {
      dest: './uploads/agents',
    }),
  )
  async createAgent(
    @GetUser() user: User,
    @Body() createAgentDto: CreateAgentDto,
    @UploadedFile() profilePic,
  ) {
    createAgentDto.profilePic = profilePic;
    return await this.agentService.createAgent(createAgentDto, user);
  }
}
