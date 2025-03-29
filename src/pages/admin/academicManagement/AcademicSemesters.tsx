import { useGetSemestersQuery } from "../../../redux/features/academicSemer/academicSemesterApi";

const AcademicSemesters = () => {
  const { data } = useGetSemestersQuery(undefined);
  console.log(data);
  return (
    <div>
      <h1>Academic Semesters</h1>
    </div>
  );
};

export default AcademicSemesters;
