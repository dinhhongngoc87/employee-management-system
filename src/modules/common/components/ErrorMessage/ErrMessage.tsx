import React from 'react';
import { FieldProps } from 'formik';
interface Props extends FieldProps {
  className?: string;
}
function ErrMessage(props: Props) {
  const { form, field, className = '' } = props;
  const { name } = field;
  const { errors, touched } = form;

  return <>{touched[name] && errors[name] && <div className={`error ${className}`}>{errors[name]}</div>}</>;
}

export default ErrMessage;
