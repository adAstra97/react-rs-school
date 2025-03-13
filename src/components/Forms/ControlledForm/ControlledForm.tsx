import { SubmitHandler, useForm } from 'react-hook-form';
import { InputField } from '../InputField/InputField';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema, TFormSchema } from '../../../utils/FormSchema.zod';
import { useAppSelector } from '../../../redux/hooks';
import { readFileAsDataURL } from '../../../utils/read-file';
import { useDispatch } from 'react-redux';
import { saveForm } from '../../../redux/slices/forms-slice';
import { useNavigate } from 'react-router';

export const ControlledForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema),
    mode: 'all',
    defaultValues: {
      gender: 'male',
    },
  });

  const countries = useAppSelector((store) => store.countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TFormSchema> = (data) => {
    readFileAsDataURL(data.picture)
      .then((base64) => {
        dispatch(saveForm({ ...data, picture: base64 }));
        navigate('/');
      })
      .catch((error) => {
        console.error('Upload failed:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        id="name"
        type="text"
        label="Name:"
        {...register('name')}
        errorMessage={errors.name?.message}
      />
      <InputField
        id="age"
        type="text"
        label="Age:"
        {...register('age')}
        errorMessage={errors.age?.message}
      />
      <InputField
        id="email"
        type="email"
        label="Email:"
        {...register('email')}
        errorMessage={errors.email?.message}
      />
      <InputField
        id="password"
        type="password"
        label="Password:"
        {...register('password')}
        errorMessage={errors.password?.message}
      />
      <InputField
        id="confirm-password"
        type="password"
        label="Repeat password:"
        {...register('confirmPassword')}
        errorMessage={errors.confirmPassword?.message}
      />
      <div>
        <fieldset>
          <legend>Gender:</legend>
          <InputField
            id="male"
            type="radio"
            label="Male:"
            value="male"
            {...register('gender')}
          />
          <InputField
            id="female"
            type="radio"
            label="Female:"
            value="female"
            {...register('gender')}
          />
        </fieldset>
      </div>
      <div>
        <InputField
          type="text"
          id="country"
          list="country-list"
          label="Country:"
          {...register('country')}
          errorMessage={errors.country?.message}
        />
        <datalist id="country-list">
          {countries.map((country) => (
            <option key={country.id} value={country.name} />
          ))}
        </datalist>
      </div>
      <InputField
        id="t&c"
        type="checkbox"
        label="I accept Terms and Conditions agreement"
        {...register('t&c')}
        errorMessage={errors['t&c']?.message}
      />
      <InputField
        id="picture"
        type="file"
        label="Upload picture:"
        {...register('picture')}
        errorMessage={errors.picture?.message}
      />
      <button type="submit" disabled={isSubmitting || !isValid}>
        {isSubmitting ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
};
