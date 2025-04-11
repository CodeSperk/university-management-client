import { FieldValues, SubmitHandler, useForm} from "react-hook-form";
import UMSForm from "../../../components/form/UMSForm";
import { Button, Col, Flex } from "antd";
import UMSInput from "../../../components/form/UMSInput";
import UMSSelect from "../../../components/form/UMSSelect";
import { useAddCourseMutation, useGetCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseSchema } from "../../../schemas/courseManagement.schema";
import { TCourse, TResponse } from "../../../types";
import { toast } from "sonner";

const CreateCourse = () => {
  const methods = useForm({
    resolver: zodResolver(courseSchema),
  });

  const {data: courseData} = useGetCoursesQuery([
    {name: "sort", value: "year"}
  ]);
  const [addCourse] = useAddCourseMutation();

  const courseOptions =
  courseData?.data?.map((item) => ({
    value: item._id,
    label: `${item.title} (${item.code})`,
  }));


  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    const toastId = toast.loading("Creating...");
    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: (data?.preRequisiteCourses || []).map((courseId: string) => ({
        course: courseId,
        isDeleted: false,
      })),
    }
    
    try{
      const res = await addCourse(courseData)  as TResponse<TCourse>;

      if(res.error){
        toast.error(res.error?.data?.message, {id: toastId});
      }else{
        toast.success("Course Created Successfully", {id: toastId})
        methods.reset();
      }
    }catch(err: any){
      toast.error(err.error, {id: toastId});
      console.log(err);
    }
  };

  return (
    <>
    <h1>Create a course</h1>
    <Flex style={{ minHeight: "70vh" }} justify="center" align="center">
      <Col span={12}>
          <UMSForm 
          onSubmit={onSubmit} 
          methods={methods}
          >
          <UMSInput type="text" name="title" label="Title"/>
          <UMSInput type="text" name="prefix" label="Prefix"/>
          <UMSInput type="number" name="code" label="Code"/>
          <UMSInput type="number" name="credits" label="Credits"/>

            <UMSSelect name="preRequisiteCourses" label="Pre Requisite Courses"
            options={courseOptions}
            mode="multiple"
            /> 
          <Button htmlType="submit" size="large">Submit</Button>
        </UMSForm>
      </Col>
    </Flex>
    </>
  );
};

export default CreateCourse;
