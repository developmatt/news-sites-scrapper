import { DatabaseInterface } from "./database.interface";

export class Database implements DatabaseInterface<any> {
  create(entity: any): Promise<any> {
    return Promise.resolve(entity);
  }
}