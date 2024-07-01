import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsDate,
  MaxLength,
  MinLength,
  IsOptional,
} from "class-validator";
import { Model } from "../../model";

export class CreateTaskModel extends Model {
  @MaxLength(200)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  public title: string;

  @MaxLength(1000)
  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsEnum(["completed", "pending"])
  @IsString()
  @IsNotEmpty()
  public status: string;

  @IsDate()
  @IsNotEmpty()
  public date: Date;

  constructor(body: any) {
    super();
    const { title, description, status, date } = body;

    this.title = title;
    this.description = description;
    this.status = status;
    this.date = new Date(date);
  }
}

export class UpdateTaskModel extends Model {
  @MaxLength(200)
  @MinLength(3)
  @IsString()
  @IsOptional()
  public title?: string;

  @MaxLength(1000)
  @IsString()
  @IsOptional()
  public description?: string;

  @IsEnum(["completed", "pending"])
  @IsString()
  @IsOptional()
  public status?: string;

  @IsDate()
  @IsOptional()
  public date?: Date;

  constructor(body: any) {
    super();
    const { title, description, status, date } = body;

    this.title = title;
    this.description = description;
    this.status = status;
    this.date = date ? new Date(date) : undefined;
  }
}
