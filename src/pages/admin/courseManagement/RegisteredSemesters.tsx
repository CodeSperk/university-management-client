import { useGetRegisteredSemestersQuery } from "../../../redux/features/admin/courseManagement.api";

const RegisteredSemesters = () => {
    const {data: registeredSemesters} = useGetRegisteredSemestersQuery(undefined);
    console.log(registeredSemesters);
    return (
        <div>
            RegisteredSemesters
        </div>
    );
};

export default RegisteredSemesters;