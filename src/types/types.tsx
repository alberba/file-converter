export interface FileData {
  name: string;
  img: HTMLImageElement;
  originalSize: number;
}

export interface ConversionOptions {
  newWidth: number;
  newHeight: number;
  selectedFormat: string;
  quality: number;
}

export interface FeatureData {
  title: string;
  image: {
    src: string;
    alt: string;
  };
  sectionClasses?: string;
  alignment: "left" | "right";
  imageClassName?: string;
}
