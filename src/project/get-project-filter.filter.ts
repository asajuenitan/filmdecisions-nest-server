import { IsOptional, IsIn } from 'class-validator';
import { ProjectStatus, ApprovalStatus } from './project.status';

export class GetProjectFilterDto {
  @IsOptional()
  @IsIn([
    ProjectStatus.DEVELOPMENT,
    ProjectStatus.PRE_PRODUCTION,
    ProjectStatus.PRODUCTION,
    ProjectStatus.POST_PRODUCTION,
    ProjectStatus.FILM_FESTIVALS,
    ProjectStatus.MEDIA_PLAN,
    ProjectStatus.DISTRIBUTION,
    ProjectStatus.FILM_BUDGET,
  ])
  status: ProjectStatus;

  @IsOptional()
  @IsIn([
    ApprovalStatus.PENDING,
    ApprovalStatus.APPROVED,
    ApprovalStatus.REJECTED,
  ])
  approvalStatus: ApprovalStatus;
}
