import { PortableTextBlock } from "next-sanity";
import { Slug } from "sanity";

export type Student = {
  _id: string;
  _createdAt: Date;
  name: string;
  slug: Slug;
  image: string;
  sheets: {
    sheetName: string;
    fragment: string;
    objective: string;
    observations: PortableTextBlock[];
    opinion: PortableTextBlock[];
  }[];
};
