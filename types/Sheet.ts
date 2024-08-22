import { PortableTextBlock } from "next-sanity";

export type Sheet = {
  sheetName: string;
  fragment: string;
  objective: string;
  observations: PortableTextBlock[];
  opinion: PortableTextBlock[] | null;
};
