import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { Model } from "../../model";

export class SignupModel extends Model {
  @MaxLength(200)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  constructor(body: any) {
    super();
    const { name, email, password } = body;

    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export class SigninModel extends Model {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  constructor(body: any) {
    super();
    const { email, password } = body;
    this.email = email;
    this.password = password;
  }
}
