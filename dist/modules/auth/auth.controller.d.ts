import { AuthService } from './auth.service';
import type { SyncUserDtoType } from './dto/sync-user.dto';
import type { UpdateProfileDtoType } from './dto/update-profile.dto';
import type { NextAuthUser } from '../../common/guards/nextauth.guard';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    syncUser(body: SyncUserDtoType): Promise<import("../users/user.schema").UserDocument>;
    getMe(user: NextAuthUser): Promise<import("../users/user.schema").UserDocument>;
    updateMe(user: NextAuthUser, body: UpdateProfileDtoType): Promise<import("../users/user.schema").UserDocument>;
}
