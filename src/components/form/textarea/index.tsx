import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Textarea, TextareaProps } from '@chakra-ui/textarea';
import { useField, FieldHookConfig } from 'formik';

interface Props extends TextareaProps {
  label?: string;
  name: string;

  fieldProps?: FieldHookConfig<string>;
}

const FormTextarea = ({ label, fieldProps, ...props }: Props) => {
  const [field, meta] = useField({ ...fieldProps, type: 'text', name: props.name });
  const isInvalid = meta.touched && !!meta.error;

  return (
    <FormControl isInvalid={isInvalid} paddingX={2}>
      {label && <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>}
      <Textarea {...field} id={props.id || props.name} {...props} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormTextarea;
