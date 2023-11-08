import { RandomService } from '../../../src/sales/infrastructure/random/random.service';

export const createFakeRandomService = (): Record<
  keyof RandomService,
  jest.Mock
> => ({
  generateULID: jest.fn(),
});
