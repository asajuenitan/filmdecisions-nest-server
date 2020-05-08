import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgentRepository } from './agent.repository';
import { AgentEntity } from './agent.entity';
import { User } from 'src/auth/user.entity';
import { CreateAgentDto } from './dto/create-agent.dto';

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(AgentRepository) private agentRepo: AgentRepository,
  ) {}

  async getAllAgents(): Promise<AgentEntity[]> {
    return await this.agentRepo.getAllAgents();
  }

  async getAgentsByUserId(id: string): Promise<AgentEntity[]> {
    return await this.agentRepo.getAgentsByUserId(id);
  }

  async getAgentsByLoggedInUser(user: User): Promise<AgentEntity[]> {
    return await this.agentRepo.getAgentsFromLoggedInUser(user);
  }

  async getAgentById(id: string): Promise<AgentEntity> {
    return await this.agentRepo.getAgentById(id);
  }

  async createAgent(
    createAgentDto: CreateAgentDto,
    user: User,
  ): Promise<AgentEntity> {
    return await this.agentRepo.createAgent(createAgentDto, user);
  }
}
