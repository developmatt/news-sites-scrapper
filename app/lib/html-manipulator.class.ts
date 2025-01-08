import * as cheerio from 'cheerio';

export class HtmlManipulator {
  private $: any;

  load(content: string) {
    this.$ = cheerio.load(content);
  }

  querySelectorAll(selector: string) {
    const found = this.$(selector);
    return found;
  }

  getAttribute(el: any, attr: string) {
    return this.$(el).attr(attr);
  }

  getText(el: any) {
    return this.$(el).text();
  }
}