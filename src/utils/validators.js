import * as Yup from 'yup';

// --- Validation Schemas for Forms ---

// Phone number regex for international formats
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// 1. Login Schema
export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

// 2. Registration Schema
export const registrationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone number is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

// 3. Profile Update Schema
export const profileSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone number is required'),
});

// 4. Movie/Event Schema (for Admin/Organizer forms)
export const eventSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  releaseDate: Yup.date()
    .min(new Date(), "Release date cannot be in the past")
    .required('Release date is required'),
  genre: Yup.string().required('Genre is required'),
  // Add more fields as needed, e.g., for cast, director, poster URL
});

// 5. Order Summary / Contact Info Schema
export const orderContactSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('A contact number is required for the booking'),
});

// 6. Help/Contact Form Schema
export const helpFormSchema = Yup.object({
  name: Yup.string().required('Your name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message cannot be empty'),
});