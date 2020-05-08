import { EntityRepository, Repository } from 'typeorm';
import { AgentEntity } from './agent.entity';
import {
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { User } from '../auth/user.entity';
import { CreateAgentDto } from './dto/create-agent.dto';

@EntityRepository(AgentEntity)
export class AgentRepository extends Repository<AgentEntity> {
  // Get all agents
  async getAllAgents(): Promise<AgentEntity[]> {
    try {
      return await this.find();
      // return agents
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  // Get Agents By User ID
  async getAgentsByUserId(id: string): Promise<AgentEntity[]> {
    try {
      return await this.find({ userId: id });
    } catch (err) {
      throw new NotFoundException();
    }
  }

  // Get Agents From Logged In User
  async getAgentsFromLoggedInUser(user: User): Promise<AgentEntity[]> {
    return await this.find({ userId: user._id.toString() });
  }

  // Get Agent By Id
  async getAgentById(id: string): Promise<AgentEntity> {
    return await this.findOne(id);
  }

  // Create Agent
  async createAgent(
    createAgentDto: CreateAgentDto,
    user: User,
  ): Promise<AgentEntity> {
    const {
      email,
      fullName,
      position,
      homeAddress,
      telephoneNumber,
      profilePic,
    } = createAgentDto;
    const agentExists = await this.findOne({ email });
    if (agentExists) {
      throw new ConflictException('Agent Exists!');
    } else {
      const newAgent = new AgentEntity();
      newAgent.fullName = fullName;
      newAgent.position = position;
      newAgent.homeAddress = homeAddress;
      newAgent.email = email;
      newAgent.telephoneNumber = telephoneNumber;
      newAgent.profilePic = profilePic;
      newAgent.userId = user._id.toString();
      newAgent.user = user;

      try {
        await newAgent.save();
        delete newAgent.user;
        return newAgent;
      } catch (err) {
        throw new InternalServerErrorException();
      }
    }
  }
}
