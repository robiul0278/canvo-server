import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { UserDocument } from '../users/user.schema';
import { SyncUserDtoType } from './dto/sync-user.dto';
import { UpdateProfileDtoType } from './dto/update-profile.dto';
export declare class AuthService {
    private userModel;
    private configService;
    private adminEmails;
    constructor(userModel: Model<UserDocument>, configService: ConfigService);
    syncUser(dto: SyncUserDtoType): Promise<UserDocument>;
    getMe(userId: string): Promise<UserDocument>;
    updateMe(userId: string, dto: UpdateProfileDtoType): Promise<UserDocument>;
}
