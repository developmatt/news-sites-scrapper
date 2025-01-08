import puppeteer, { Browser, Page } from 'puppeteer';
import * as cheerio from 'cheerio';

export class Crawler {
  public crawler!: Browser
  public page!: Page

  async init(): Promise<void> {
    this.crawler = await puppeteer.launch();
    console.log(">>> Crawler initialized");
    this.page = await this.crawler.newPage();
    console.log(">>> Page created");
  }

  async navigateToPage(url: string, options: any) {
    await this.page.goto(url, options);
    console.log(">>> Navigated to page");
    return this.page;
  }

  async extractContent() {
    return this.page.content();
  }

  async closeConnection() {
    await this.crawler.close();
  }
}