import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './user.repository';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository
  ){}

  async signUp(authCrendentialDto: AuthCredentialsDto): Promise<void>{
    return this.usersRepository.createUser(authCrendentialDto)
  }
  async signIn(authCrendentialDto: AuthCredentialsDto): Promise<string> {
    const {username, password} = authCrendentialDto;
    const user = await this.usersRepository.findOne({username})

    if(user && (await bcrypt.compare(password, user.password))){
      return 'success';
    } else {
      throw new UnauthorizedException('Invalid Credentials')
    }
  }
}
