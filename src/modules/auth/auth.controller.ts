import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SyncUserDto } from './dto/sync-user.dto';
import type { SyncUserDtoType } from './dto/sync-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import type { UpdateProfileDtoType } from './dto/update-profile.dto';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { NextAuthUser } from '../../common/guards/nextauth.guard';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sync')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sync Google user after login' })
  async syncUser(
    @Body(new ZodValidationPipe(SyncUserDto)) body: SyncUserDtoType,
  ) {
    return this.authService.syncUser(body);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user from DB' })
  async getMe(@CurrentUser() user: NextAuthUser) {
    return this.authService.getMe(user.id);
  }

  @Patch('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update phone and addresses' })
  async updateMe(
    @CurrentUser() user: NextAuthUser,
    @Body(new ZodValidationPipe(UpdateProfileDto)) body: UpdateProfileDtoType,
  ) {
    return this.authService.updateMe(user.id, body);
  }
}
