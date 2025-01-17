import puppeteer, { Browser, GoToOptions, Page } from 'puppeteer';

export class Crawler {
  public crawler!: Browser
  public page!: Page

  async init(): Promise<void> {
    this.crawler = await puppeteer.launch();
    this.page = await this.crawler.newPage();
  }

  async navigateToPage(url: string, options: GoToOptions) {
    await this.page.goto(url, options);
    return this.page;
  }

  async extractContent() {
    return this.page.content();
  }

  async closeConnection() {
    await this.crawler.close();
  }
}