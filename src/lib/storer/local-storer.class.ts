import fs from 'fs';
import path from 'path';
import { CreateRawNewsDto } from '../../repositories/raw-news-repository/dto/create-raw-news.dto';
import { DatabaseInterface } from '../../infra/database/database.interface';
import { RawNewsEntity } from '../../repositories/raw-news-repository/entities/raw-news.entity';

const BASE_DIR = './g1';

export class LocalStorer implements DatabaseInterface {
  async create(createRawNewsDto: CreateRawNewsDto): Promise<RawNewsEntity | undefined> {
    try {
        const fileName = `${BASE_DIR}/${createRawNewsDto.title.replace(/ /g, '_')}`
        const diretorio = path.dirname(fileName);
        fs.mkdir(diretorio, { recursive: true }, (erro) => {
            if(erro) console.error('Erro ao criar diretório:', erro);
        });

        fs.writeFile(fileName, createRawNewsDto.content, 'utf-8', (erro) => {
            if(erro) console.error('Erro ao escrever no arquivo:', erro);
        });
        console.log(`Arquivo "${fileName}" criado/atualizado com sucesso!`);

        return createRawNewsDto;
    } catch (erro) {
        console.error('Erro ao escrever no arquivo:', erro);
        return
    }
  }
}