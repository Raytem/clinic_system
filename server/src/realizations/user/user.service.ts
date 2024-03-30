import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    transactionalEntityManager?: EntityManager,
  ): Promise<UserEntity> {
    let user;
    try {
      user = await this.findOne({ email: createUserDto.email });
    } catch (e) {}

    if (user) {
      throw new BadRequestException('User with the same email already exists');
    }

    const userEntity = this.userRepo.create(createUserDto);

    if (transactionalEntityManager) {
      await transactionalEntityManager.save(userEntity);
    } else {
      await this.userRepo.save(userEntity);
    }

    return userEntity;
  }

  async findOne(findUserDto: FindUserDto): Promise<UserEntity> {
    const user = await this.userRepo.findOneBy(findUserDto);

    if (!user) {
      throw new NotFoundException('No such user');
    }

    return user;
  }
}
