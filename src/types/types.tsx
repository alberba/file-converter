export interface FileData {
  name: string;
  img: HTMLImageElement;
  originalSize: number;
};

export interface ConversionOptions {
  newWidth: number;
  newHeight: number;
  selectedFormat: string;
}