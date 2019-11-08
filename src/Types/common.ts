export interface IHistory {
  id: number;
  userId: string;
  query: string;
}

export interface ILike {
  id: number;
  userId: string;
}

export interface IPhoto {
  id: number;
  imageHeight: number;
  imageWidth: number;
  largeImageURL: string;
  tags: string;
}
