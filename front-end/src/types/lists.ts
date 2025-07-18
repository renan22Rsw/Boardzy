import { Card } from "./cards";

export interface List {
  id: string;
  title: string;
  card?: Card[];
}
