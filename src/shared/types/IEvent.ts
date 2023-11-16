export interface IEvent<T extends object = object> {
  readonly aggregateId: string;
  readonly data: T;
  readonly version?: number;
}
