import { UsersService } from './users.service';
import type { QueryUserDtoType } from './dto/query-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(query: QueryUserDtoType): Promise<import("../../common/helpers/query.helper").PaginatedResult<unknown>>;
    updateRole(id: string, role: string): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").UserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./user.schema").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateStatus(id: string, isActive: boolean): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").UserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./user.schema").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
