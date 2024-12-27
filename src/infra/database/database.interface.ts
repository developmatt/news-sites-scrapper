export interface DatabaseInterface {
  create(entity: any): Promise<any | undefined>;
}