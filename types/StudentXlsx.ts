import { PortableTextBlock } from "next-sanity";
import { Slug } from "sanity";

export type StudentXlsx = {
  name: string;
  sheets: {
    sheetName: string;
    fragment: string;
    objective: string;
    observations: PortableTextBlock[];
  }[];
};
