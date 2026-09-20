import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { DashboardService } from './dashboard.service.js';

@Controller('admin/dashboard-stats')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  getStats() {
    return this.dashboardService.getStats();
  }
}
