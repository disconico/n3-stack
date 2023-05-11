import { Expose } from 'class-transformer';
import { User } from 'shared';
import { AllKeys } from 'shared';

export class UserClientDto implements AllKeys<User, UserClientDto> {
  @Expose()
  id: number;

  @Expose()
  username: string;
}
