import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button, StackProps, VStack } from '@chakra-ui/react';
import FormInput from 'components/common/form/input';

const schema = yup.object().shape({
  name: yup.string().max(64, 'Too long').required('Required'),
});

interface IDaoInput {
  name: string;
}

interface IDaoFormProps extends Omit<StackProps, 'onSubmit'> {
  onSubmit: (data: IDaoInput) => void;
}

const defaultValues = {
  name: 'ExampleDAO',
};

const DaoForm: React.FC<IDaoFormProps> = ({ onSubmit, ...props }) => {
  const { control, handleSubmit } = useForm<IDaoInput>({
    resolver: yupResolver(schema) as any,
    defaultValues,
  });
  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} {...props}>
      <FormInput label="Name of your DAO" name="name" control={control} placeholder="ExampleDAO" />
      <Button type="submit" alignSelf="flex-end">
        Next: Token
      </Button>
    </VStack>
  );
};

export default DaoForm;
