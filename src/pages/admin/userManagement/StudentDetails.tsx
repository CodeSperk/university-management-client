import { useParams } from "react-router-dom";

const StudentDetails = () => {
    const {studentId} = useParams();
    return (
        <div>
                Student details of  ${studentId}
        </div>
    );
};

export default StudentDetails;