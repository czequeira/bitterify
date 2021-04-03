import { BitterifyError } from './bitterify.error';

export class MountError extends BitterifyError {
  constructor(elemntId: string) {
    super(`Element id ${elemntId} not found`);
  }
}
