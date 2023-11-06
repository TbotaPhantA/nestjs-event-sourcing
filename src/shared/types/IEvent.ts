export interface IEvent<T extends object = object> {
  aggregateId: string;
  data: T;
  version?: number;
}
