export interface HomePageNewsLinksExtractorInterface {
  extract(): Promise<string[]>;
}