import { Button } from '@chakra-ui/button';
import { Box, GridItem, HStack, SimpleGrid, Stack } from '@chakra-ui/layout';
import FormCheckbox from '@components/form/checkbox';
import FormInput from '@components/form/input';
import FormTextarea from '@components/form/textarea';
import { Formik, Form, Field, ErrorMessage, useField, FieldHookConfig } from 'formik';
import { useMutation } from 'react-query';
import api from 'src/utils/api';
import * as Yup from 'yup';
import { isEmpty } from 'lodash';

const validationSchema = Yup.object({
  longUrl: Yup.string().url('Invalid URL').required('Required'),
  name: Yup.string().max(100, 'Must be 100 characters or less').required('Required'),
  customUrlCode: Yup.string().max(50, 'Must be 50 characters or less').optional(),
  description: Yup.string().max(500, 'Must be 500 characters or less').optional(),
  shouldReturnExisting: Yup.boolean().required('Required'),
});

// TODO: Mettre dans un .d.ts ou exporter au meme endroit que le call api?

export interface Url {
  id: number;
  name: string;
  description: string | null;
  longUrl: string;
  shortUrl: string;
  urlCode: string | null;
  clickCount: number;
  updatedAt: string;
  createdAt: string;
}
export interface CreateUrlDTO {
  longUrl: string;
  name: string;
  customUrlCode?: string;
  description?: string;
  shouldReturnExisting?: boolean;
}

interface Props {
  initialValues?: Partial<CreateUrlDTO>;
  onSubmit: (data: CreateUrlDTO) => Promise<void>;
}

export function UrlShortenerForm({ initialValues, onSubmit }: Props) {
  return (
    <Formik
      initialValues={{
        longUrl: initialValues?.longUrl,
        name: initialValues?.name,
        customUrlCode: initialValues?.customUrlCode,
        description: initialValues?.description,
        shouldReturnExisting: initialValues?.shouldReturnExisting || true,
      }}
      validationSchema={validationSchema}
      onSubmit={async ({ longUrl, name, customUrlCode, description, shouldReturnExisting }, { setSubmitting }) => {
        name = name.trim();

        customUrlCode = customUrlCode?.trim();
        if (description) description = description.trim();

        await onSubmit({
          longUrl,
          name,
          shouldReturnExisting,
          customUrlCode: isEmpty(customUrlCode) ? undefined : customUrlCode,
          description: isEmpty(description) ? undefined : description,
        });
      }}
    >
      {(formik) => (
        <Form>
          <SimpleGrid columns={{ md: 3 }} rowGap={3} mb={3}>
            <GridItem colSpan={{ md: 2 }}>
              <FormInput label="URL" name="longUrl" type="text" placeholder="https://github.com/ifonny" />
            </GridItem>
            <GridItem>
              <FormInput label="Custom URL code" name="customUrlCode" type="text" placeholder="Custom URL code" />
            </GridItem>
          </SimpleGrid>

          <SimpleGrid columns={{ sm: 1, md: 3 }} rowGap={3} alignItems="center" mb={3}>
            <GridItem colSpan={2}>
              <FormInput name="name" type="text" placeholder="Name" />
            </GridItem>
            <GridItem colSpan={1} textAlign="left">
              <FormCheckbox name="shouldReturnExisting">Show existing Short URL</FormCheckbox>
            </GridItem>
          </SimpleGrid>

          <Box mb={3}>
            <FormTextarea label="Description" name="description" placeholder="Description" />
          </Box>

          <Button isLoading={formik.isSubmitting} isDisabled={!formik.isValid} type="submit">
            Shorten
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default UrlShortenerForm;
