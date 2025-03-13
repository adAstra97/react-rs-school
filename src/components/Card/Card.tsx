import { StoredForm } from '../../redux/slices/forms-slice';

interface Props {
  item: StoredForm;
}

export const Card = ({ item }: Props) => {
  const { name, age, password, country, email, gender, picture, terms } = item;
  return (
    <li className="group rounded-2xl overflow-hidden border-2 border-grey">
      <div className="w-full aspect-square overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          src={picture}
          alt={name}
        />
      </div>
      <div className="p-4 text-grey">
        <div className="flex gap-2">
          <b>Name:</b> {name}
        </div>
        <div className="flex gap-2">
          <b>Age:</b> {age}
        </div>
        <div className="flex gap-2">
          <b>Email:</b> {email}
        </div>
        <div className="flex gap-2">
          <b>Password:</b> {password}
        </div>
        <div className="flex gap-2">
          <b>Gender:</b> {gender}
        </div>
        <div className="flex gap-2">
          <b>Country:</b> {country}
        </div>
        <div className="flex gap-2">
          <b>Terms and Conditions:</b> {terms && '✅'}
        </div>
      </div>
    </li>
  );
};
