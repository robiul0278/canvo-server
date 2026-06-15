import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { QueryUserDtoType } from './dto/query-user.dto';
import { QueryHelper } from '../../common/helpers/query.helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findAll(query: QueryUserDtoType) {
    const filter = QueryHelper.combine(
      QueryHelper.buildTextSearch(['name', 'email'], query.search),
      QueryHelper.buildMatchFilter('role', query.role),
      query.isActive !== undefined
        ? QueryHelper.buildMatchFilter('isActive', query.isActive)
        : undefined,
    );

    return QueryHelper.paginate(this.userModel, filter, {
      page: query.page,
      limit: query.limit,
      sort: QueryHelper.buildSort(query.sort, { createdAt: -1 }),
      select: '-__v',
    });
  }

  async updateRole(id: string, role: string) {
    if (!['admin', 'moderator', 'user'].includes(role)) {
      throw new BadRequestException('Invalid role');
    }

    const user = await this.userModel.findByIdAndUpdate(
      id,
      { role },
      { new: true },
    );

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateStatus(id: string, isActive: boolean) {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { isActive },
      { new: true },
    );

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) throw new NotFoundException('User not found');
    return { deleted: true };
  }

}
