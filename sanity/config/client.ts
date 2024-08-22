import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "ikos1u0w",
  dataset: "production",
  useCdn: false,
  apiVersion: "2023-03-25",
});
