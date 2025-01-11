export interface DatabaseInterface {
  create(entity: any, options?: any): Promise<any | undefined>;
  findOne(entity: any): Promise<any | null>;
}