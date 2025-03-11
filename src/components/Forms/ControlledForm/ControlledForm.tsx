import { InputField } from '../InputField/InputField';

export const ControlledForm = () => {
  return (
    <form action="">
      <InputField id="name" type="text" label="Name:" />
      <InputField id="age" type="number" label="Age:" />
      <InputField id="email" type="email" label="Email:" />
      <InputField id="password" type="password" label="Password:" />
      <InputField
        id="repeat-password"
        type="password"
        label="Repeat password:"
      />
      <div>
        <fieldset>
          <legend>Gender:</legend>
          <InputField id="male" type="radio" label="Male:" name="gender" />
          <InputField id="female" type="radio" label="Female:" name="gender" />
        </fieldset>
      </div>
      <div>
        <InputField id="country" list="country-list" label="Country:" />
        <datalist id="country-list">
          <option value="England" />
          <option value="Poland" />
          <option value="Belarus" />
        </datalist>
      </div>
      <InputField
        id="t"
        type="checkbox"
        label="I accept Terms and Conditions agreement"
      />
      <InputField id="photo" type="file" label="Upload photo:" />
      <button type="submit">Submit</button>
    </form>
  );
};
