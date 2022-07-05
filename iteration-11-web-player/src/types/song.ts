/* Feel free to amend the Song type as you need */
export interface Song {
  name: string;
  author: string;
  coverURL: string;
  length: number;
  inQueue: boolean;
  played: boolean;
  playing: boolean;
}
