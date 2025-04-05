import { Form } from "antd";
import { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm, UseFormReturn } from "react-hook-form";

type TFormConfig = {
  defaultValues?:Record<string, any>;
  resolver?:any;
  methods?: UseFormReturn<any>
}
type TFormProps = {
    onSubmit: SubmitHandler<FieldValues>;
    children: ReactNode;
} & TFormConfig;
 
const UMSForm = ({ onSubmit, children, defaultValues, resolver, methods: externalMethods }: TFormProps) => {

  const internalMethods = useForm({
    ...(defaultValues ? { defaultValues } : {}),
    ...(resolver ? { resolver } : {}),
  });

  const methods = externalMethods || internalMethods;
  
  const submit = (data: FieldValues) => {
    onSubmit(data);
  }

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>{children}</Form>
    </FormProvider>
  );
};

export default UMSForm;
