import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.schema';
import { SyncUserDtoType } from './dto/sync-user.dto';
import { UpdateProfileDtoType } from './dto/update-profile.dto';

@Injectable()
export class AuthService {
  private adminEmails: string[];

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {
    const raw = this.configService.get<string>('ADMIN_EMAILS') || '';
    this.adminEmails = raw
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
  }

  async syncUser(dto: SyncUserDtoType): Promise<UserDocument> {
    const isAdmin = this.adminEmails.includes(dto.email.toLowerCase());

    let user = await this.userModel.findOne({ googleId: dto.googleId });

    if (user) {
      user.lastLogin = new Date();
      if (dto.avatar) user.avatar = dto.avatar;
      if (dto.name) user.name = dto.name;
      if (isAdmin) user.role = 'admin';
      return user.save();
    }

    const existingEmail = await this.userModel.findOne({ email: dto.email });
    if (existingEmail) {
      existingEmail.googleId = dto.googleId;
      existingEmail.lastLogin = new Date();
      if (dto.avatar) existingEmail.avatar = dto.avatar;
      if (isAdmin) existingEmail.role = 'admin';
      return existingEmail.save();
    }

    user = new this.userModel({
      googleId: dto.googleId,
      name: dto.name,
      email: dto.email,
      avatar: dto.avatar,
      role: isAdmin ? 'admin' : 'user',
      lastLogin: new Date(),
    });

    return user.save();
  }

  async getMe(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateMe(
    userId: string,
    dto: UpdateProfileDtoType,
  ): Promise<UserDocument> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    if (dto.phone !== undefined) user.phone = dto.phone;
    if (dto.addresses !== undefined) user.addresses = dto.addresses as any;

    return user.save();
  }
}
