import { client } from "../../sanity/config/client";
import { groq } from "next-sanity";
import { Student } from "../../types/Student";

const getAllStudentQuery = groq`*[ _type == "student"   && increscendo == true]  | order(name asc){
  _id,
  name,
  sheets[]{
    sheetName,
    fragment,
    objective,
    observations
  }
}`;
export async function fetchStudents(): Promise<Student[]> {
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
