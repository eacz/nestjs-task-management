import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './user.repository';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import JwtPayload from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService
  ){}

  async signUp(authCrendentialDto: AuthCredentialsDto): Promise<void>{
    return this.usersRepository.createUser(authCrendentialDto)
  }
  async signIn(authCrendentialDto: AuthCredentialsDto): Promise<{accessToken: string}> {
    const {username, password} = authCrendentialDto;
    const user = await this.usersRepository.findOne({username})

    if(user && (await bcrypt.compare(password, user.password))){
      const payload:  JwtPayload = { username};
      
      const accessToken = await this.jwtService.sign(payload)
      return { accessToken }
    } else {
      throw new UnauthorizedException('Invalid Credentials')
    }
  }
}
