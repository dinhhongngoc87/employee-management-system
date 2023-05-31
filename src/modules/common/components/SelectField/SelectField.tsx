import React from 'react';
import className from 'classnames/bind';
import { FieldProps } from 'formik';

import styles from './SelectField.module.scss';
interface Factory {
  name: string;
  value: number;
}
interface Props extends FieldProps {
  options?: Factory[];
}

const cx = className.bind(styles);
function SelectField(props: Props) {
  const { field, form, options = [] } = props;
  const { name, onBlur, onChange } = field;
  const { errors, touched } = form;
  const showError = touched[name] && errors[name];
  return (
    <>
      <select id={name} name={name} onBlur={onBlur} onChange={onChange}>
        {options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
      {showError && <div className="error">{errors[name]}</div>}
    </>
  );
}

export default SelectField;
