export interface StorerInterface {
  writeFile(fileName: string, content: string): Promise<any>
}