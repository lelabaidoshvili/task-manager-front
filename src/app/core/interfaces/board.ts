import {Column} from "./column";

export interface Board {
  name: string;
  description: string;
  position: number;
  columns: Column[];
}
