import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UsersService } from '../src/users.service';

@ValidatorConstraint({ name: 'Exists', async: true })
@Injectable()
export class ExistsRule implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(value: string, args: ValidationArguments) {
    const [field] = args.constraints;
    try {
      const userExist = await this.usersService.checkExisting(field, value);
      return !userExist;
    } catch (e) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    const [field] = args.constraints;
    return `${field} already exists`;
  }
}

export function Exists(field: string, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [field],
      validator: ExistsRule,
    });
  };
}
