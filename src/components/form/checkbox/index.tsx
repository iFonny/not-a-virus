import { Checkbox, CheckboxProps } from '@chakra-ui/checkbox';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { useField, FieldHookConfig } from 'formik';

interface Props extends CheckboxProps {
  label?: string;
  name: string;

  fieldProps?: FieldHookConfig<string>;
}

const FormCheckbox = ({ label, fieldProps, children, ...props }: Props) => {
  const [field, meta] = useField({ ...fieldProps, type: 'checkbox', name: props.name });
  const isInvalid = meta.touched && !!meta.error;

  return (
    <FormControl isInvalid={isInvalid} paddingX={2}>
      {label && <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>}
      <Checkbox {...field} id={props.id || props.name} {...props} isChecked={field.checked} isInvalid={isInvalid}>
        {children}
      </Checkbox>
    </FormControl>
  );
};

export default FormCheckbox;
