import { DatePicker, Form } from "antd";
import { Controller} from "react-hook-form";

type TDateProps = {
    name: string,
    label?: string
}

const UMSDate = ({ name, label }: TDateProps) => {
  return (
    <div style={{marginBottom:"20px"}}>
      <Controller
        name={name}
        render={({ field, fieldState: {error}}) => (
            <Form.Item label={label}>
              <DatePicker {...field} id={name} size="large" style={{width: "100%"}}/>
              {error && <small style={{color: "red"}}>{error?.message}</small>}
            </Form.Item>
        )}
         />
    </div>
  );
};

export default UMSDate;
