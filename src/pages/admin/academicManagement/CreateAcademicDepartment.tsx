import { Button, Col, Flex } from "antd";
import { toast } from "sonner";
import UMSForm from "../../../components/form/UMSForm";
import UMSInput from "../../../components/form/UMSInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddAcademicDepartmentMutation, useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { FieldValues } from "react-hook-form";
import { TAcademicDepartment, TResponseRedux } from "../../../types";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import UMSSelect from "../../../components/form/UMSSelect";

const CreateAcademicDepartment = () => {
    const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

    const {data: facultyData} = useGetAcademicFacultiesQuery(undefined);

    const facultyOptions = facultyData?.data?.map((item) => ({
        value: item._id,
        label: item.name
    })) || [];

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Creating..")

        const facultyData = {
            name: data.name,
            academicFaculty: data.academicFaculty 
        }
        
        try{
            const res = await addAcademicDepartment(facultyData) as TResponseRedux<TAcademicDepartment>;
            if(res.error){
                toast.error(res.error?.data?.message, {id: toastId})
            }else{
                toast.success("Academic Department Created Successfylly", {id: toastId})
            }
        }catch(err: any){
            toast.error(err.error, {id: toastId})
        } 
    }

    return (
        <Flex style={{ minHeight: "100vh" }} justify="center" align="center">
            <Col span={12}>
        <h1 style={{marginBottom: "48px"}}>Create Academic Department</h1>
            <UMSForm onSubmit={onSubmit} resolver={zodResolver(academicDepartmentSchema)}>
                <UMSInput type="text" name="name" label="Department Name :"/>
                <UMSSelect name="academicFaculty" label="Select Faclty :"
                options = {facultyOptions || []}
                />
            <Button htmlType="submit" size="large">Submit</Button>
            </UMSForm>
            </Col>
        </Flex>
    );
};

export default CreateAcademicDepartment;