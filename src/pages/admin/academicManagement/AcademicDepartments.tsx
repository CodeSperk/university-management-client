import { useGetAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";

const AcademicDepartments = () => {
    const {data} = useGetAcademicDepartmentQuery(undefined);
    console.log(data);
    return (
        <div>
            <h1>Academic Departments</h1>
        </div>
    );
};

export default AcademicDepartments;