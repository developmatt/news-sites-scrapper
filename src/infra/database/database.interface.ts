export interface DatabaseInterface {
  create(entity: any, options?: any): Promise<any | undefined>;
}