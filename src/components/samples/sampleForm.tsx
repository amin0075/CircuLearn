// react
import React from 'react';

// nextjs
import { useRouter } from 'next/router';

// yup & react-user-form
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// components
import Button from '@src/components/Button';
import TextField from '@src/components/TextField';

interface IProps {}

interface IFormInputs {
  firstName: string;
  lastName: string;
}

const schema = yup
  .object({
    firstName: yup.string().required('this field is rrequired.').typeError('just type letters.'),
    lastName: yup.string().required('this field is rrequired.').typeError('just type letters.'),
  })
  .required();

const SampleForm: React.FC<IProps> = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextField
          // label="first name"
          {...register('firstName')}
          // error={errors.firstName?.message !== undefined}
          // helperText={errors.firstName?.message}
        />

        <TextField
          // label="first name"
          {...register('lastName')}
          // error={errors.firstName?.message !== undefined}
          // helperText={errors.firstName?.message}
        />

        <Button type="submit">Confirm</Button>
      </div>
    </form>
  );
};

export default SampleForm;
