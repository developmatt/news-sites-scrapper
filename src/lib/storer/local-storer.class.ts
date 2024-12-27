import fs from 'fs';
import path from 'path';
import { DatabaseInterface } from '../../infra/database/database.interface';

type CreateOptions = {
  retry?: number;
};

export class LocalStorer implements DatabaseInterface {
  async create(fileName: string, content: any): Promise<void> {
      try {
        const directory = path.dirname(fileName);
  
        fs.mkdirSync(directory, { recursive: true });
        fs.writeFileSync(fileName, content, "utf-8");
      } catch (erro) {
        console.error("Erro ao escrever no arquivo:", erro);
        return;
      }
    }
}