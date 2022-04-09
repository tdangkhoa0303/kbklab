import {User} from 'entities';

export interface AttemptPlaygroundPayload {
  user: User;
  playgroundId: string;
}
