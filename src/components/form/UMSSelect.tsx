import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSelectProps =  {
    name: string,
    label: string,
    options: {
        value: string,
        label: string,
        disabled? :boolean
    }[] | [],
    disabled?: boolean
}
const UMSSelect = ({name, label, options, disabled } : TSelectProps) => (
  <Controller
    name={name}
    render={({ field, fieldState: {error}}) => (
      <Form.Item label={label}>
        <Select
          style={{ width: "100%" }}
          {...field}
          options={options}
          disabled={disabled}
          size="large"
        /> 
        {error && <small style={{color:"red"}}>{error?.message}</small>}
      </Form.Item>
    )}
  />
);
export default UMSSelect;
