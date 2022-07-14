import { User } from './user';

export class UserCollection {
  constructor(
    public items: User[],
    public count: number) {}
}
