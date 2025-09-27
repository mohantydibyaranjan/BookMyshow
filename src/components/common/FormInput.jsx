import React from 'react';
import { useField } from 'formik';
import { TextField, FormHelperText, FormControl } from '@mui/material';

/**
 * A reusable form input component that integrates with Formik.
 *
 * @param {object} props - The component props.
 * @param {string} props.name - The name of the field, which must match the Formik initialValues.
 * @param {string} props.label - The label to display for the input field.
 * @param {'text' | 'password' | 'email' | 'number'} [props.type='text'] - The type of the input.
 * @param {string} [props.placeholder] - The placeholder text.
 * @param {boolean} [props.multiline=false] - Whether the input is a multiline textarea.
 * @param {number} [props.rows=1] - The number of rows for a multiline input.
 * @returns {JSX.Element} The rendered form input component.
 */
const FormInput = ({ name, label, type = 'text', placeholder, multiline = false, rows = 1, ...rest }) => {
  const [field, meta] = useField(name);

  const configTextField = {
    ...field,
    ...rest,
    fullWidth: true,
    label: label,
    type: type,
    variant: 'outlined',
    placeholder: placeholder,
    multiline: multiline,
    rows: multiline ? rows : 1,
    error: meta.touched && Boolean(meta.error),
  };

  return (
    <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
      <TextField {...configTextField} />
      {meta.touched && meta.error && (
        <FormHelperText error>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormInput;