import React from 'react';
import { Button as MuiButton } from '@mui/material';

/**
 * A custom, reusable button component.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content of the button.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - The type of the button.
 * @param {'contained' | 'outlined' | 'text'} [props.variant='contained'] - The MUI variant of the button.
 * @param {'primary' | 'secondary'} [props.color='primary'] - The color theme of the button.
 * @param {function} [props.onClick] - The function to call when the button is clicked.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {string} [props.className] - Additional Tailwind CSS classes to apply.
 * @returns {JSX.Element} The rendered button component.
 */
const Button = ({
  children,
  type = 'button',
  variant = 'contained',
  color = 'primary',
  onClick,
  disabled = false,
  className = '',
  ...rest
}) => {
  // Combine MUI props with Tailwind classes for a hybrid styling approach
  const buttonClasses = `
    px-6 py-2 rounded-lg font-semibold shadow-md
    transition-transform transform hover:scale-105
    disabled:opacity-50 disabled:cursor-not-allowed
    ${className}
  `;

  return (
    <MuiButton
      type={type}
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

export default Button;