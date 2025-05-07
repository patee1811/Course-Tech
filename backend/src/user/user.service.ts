import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';  
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('This email has already been used.');
    }
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: [
        { email: email }
      ]
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
     const user = await this.findOneUser(id);

     Object.assign(user, updateUserDto);

     return this.userRepository.save(user);
  }

  async removeUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
       throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
