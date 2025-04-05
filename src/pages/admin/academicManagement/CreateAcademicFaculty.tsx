import { FieldValues, useForm } from "react-hook-form";
import UMSForm from "../../../components/form/UMSForm";
import UMSInput from "../../../components/form/UMSInput";
import { Button, Col, Flex } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TAcademicFaculty, TResponse } from "../../../types";


const CreateAcademicFaculty = () => {
    const methods = useForm({
        resolver: zodResolver(academicFacultySchema)
    })
    const [addAcademicFaculty] = useAddAcademicFacultyMutation();

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Creating..")
        const facultyData = {
            name: data.name,
        }
        
        try{
            const res = await addAcademicFaculty(facultyData) as TResponse<TAcademicFaculty>;
            if(res.error){
                toast.error(res.error?.data?.message, {id: toastId})
            }else{
                toast.success("Academic Faculty Created Successfylly", {id: toastId})
                methods.reset();
            }
        }catch(err: any){
            toast.error(err.error)
        }
    }

    return (
        <Flex style={{ minHeight: "100vh" }} justify="center" align="center">
            <Col span={12}>
        <h1 style={{marginBottom: "48px"}}>Create Academic faculty</h1>
            <UMSForm onSubmit={onSubmit} methods={methods}>
                <UMSInput type="text" name="name" label="Faculty Name"/>
            <Button htmlType="submit" size="large">Submit</Button>
            </UMSForm>
            </Col>
        </Flex>
    );
};

export default CreateAcademicFaculty;