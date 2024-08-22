import { client } from "../config/client";
import { groq } from "next-sanity";
import { Student } from "../../types/Student";

const getAllStudentQuery = groq`*[ _type == "student"]  | order(name asc){
  _id,
  name,
  sheets[]{
    sheetName,
    objective,
    observations,
    opinion
  }
}`;
export async function fetchEthnoStudents(): Promise<Student[]> {
  try {
    return await client.fetch(
      getAllStudentQuery,
      {},
      { next: { revalidate: 60 } }
    );
  } catch (error) {
    console.error("Error mientras se cargan los estudiantes", error);
    throw error;
  }
}
