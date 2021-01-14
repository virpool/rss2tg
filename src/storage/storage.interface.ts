export default interface Storage {
  get(): Promise<number>;
  save(value: number): Promise<void>;
}