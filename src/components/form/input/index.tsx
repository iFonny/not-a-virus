import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input, InputProps } from '@chakra-ui/input';
import { useField, FieldHookConfig } from 'formik';

interface Props extends InputProps {
  label?: string;
  name: string;
  type?: 'text' | 'password' | 'email' | 'number';

  fieldProps?: FieldHookConfig<string>;
}

const FormInput = ({ label, fieldProps, ...props }: Props) => {
  const [field, meta] = useField({ ...fieldProps, type: props.type, name: props.name });
  const isInvalid = meta.touched && !!meta.error;

  return (
    <FormControl isInvalid={isInvalid} paddingX={2}>
      {label && <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>}
      <Input {...field} id={props.id || props.name} {...props} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
