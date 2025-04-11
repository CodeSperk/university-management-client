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
    disabled?: boolean,
    mode?: 'multiple' | undefined;
}
const UMSSelect = ({name, label, options, mode, disabled } : TSelectProps) => (
  <Controller
    name={name}
    render={({ field, fieldState: {error}}) => (
      <Form.Item label={label}>
        <Select
          style={{ width: "100%" }}
          {...field}
          mode={mode}
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
