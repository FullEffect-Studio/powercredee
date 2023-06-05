import {IsNotEmpty, IsOptional} from "class-validator";

export class DriversInListDto {
  id: string;
  schoolId: string
  name: string;
  phoneNumber: string;
  address: string;
  idCardNumber?: string
  licenseType?: string
  licenseNumber?: string
  createdAt: string|Date
  updatedAt: string|Date
}

export class EditDriverDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  address: string;
}

export class AddDriverDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsOptional()
  idCardNumber: string;

  @IsOptional()
  licenseType: string;

  @IsOptional()
  licenseNumber: string;

  @IsNotEmpty()
  address: string;
}
