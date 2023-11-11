import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { UtilityService } from 'src/utility/utility.service';
import { JwtService } from '@nestjs/jwt';
import authConstants from './auth-constants';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ProductsService } from 'src/products/products.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly userService: UsersService,
    private readonly utilityService: UtilityService,
    private readonly jwtService: JwtService,
    private readonly productService: ProductsService
  ) { }

  @Post('login')
  async login(@Body() login: LoginDto) {
    //return this.authenticationService.create(login);
    //Step 1: Check UserName
    let user = null
    const checkInputUserName = this.utilityService.checkString(login.username)
    if (checkInputUserName.type === 'email') {
      user = await this.userService.checkEmailAndPassword(login.username, login.productID)
    } else if (checkInputUserName.type === 'phone') {
      user = await this.userService.checkPhoneAndPassword(login.username, login.productID)
    } else {
      user = await this.userService.checkUserNameAndPassword(login.username, login.productID)
    }

    if (!user) {
      throw new HttpException(`User ${checkInputUserName.data} not found, Smart detect type ${checkInputUserName.type} !`, HttpStatus.UNAUTHORIZED);
    }
    //Step 2: Check Password
    const passwordCompared = await bcrypt.compare(login.password, user.password);
    if (!passwordCompared) {
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      ID: user.ID,
      email: user.email,
      phone: user.phone,
      productID: user.productID
    };

    //Step 2: Gen token
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: authConstants.jwt.expirationTime.accessToken,
      secret: authConstants.jwt.secrets.accessToken,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: authConstants.jwt.expirationTime.refreshToken,
      secret: authConstants.jwt.secrets.refreshToken,
    });

    const data = {
      accessToken,
      refreshToken
    }
    return { statusCode: 201, message: 'User login success', data };
  }

  @Post('register')
  async register(@Body() register: RegisterDto) {

    //Step 1: Check data
    if (register.email) {
      const checkMail = await this.userService.checkEmail(register.email)
      if(checkMail)
      {
        throw new HttpException(`${register.email} already exist !`, HttpStatus.CONFLICT); 
      }
    }
    if(register.phone)
    {
      const checkPhone = await this.userService.checkPhone(register.phone)
      if(checkPhone)
      {
        throw new HttpException(`${register.phone} already exist !`, HttpStatus.CONFLICT); 
      }
    }
    //Step 2: Check product
    const dataProducts = await this.productService.findOne(register.productID)
    if (!dataProducts) {
      throw new HttpException(`Products ${register.productID} not found !'`, HttpStatus.NOT_FOUND);
    }

    //Step 3: Mapping data
    const createUser: CreateUserDto = {
      password: register.password,
      username: register.username,
      full_name: register.full_name,
      email: register.email,
      phone: register.phone
    }
    
    //Step 4: Create data user
    const data = await this.userService.create(createUser, dataProducts)
    return { statusCode: 201, message: 'User register success !', data };

  }

}
