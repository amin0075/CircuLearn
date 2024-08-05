import {
  onlyLetters_REGEX,
  onlynumerics_REGEX,
  password_REGEX,
  username_REGEX,
} from "./REGEX";
import * as yup from "yup";

// username
const usernameSchema = yup
  .string()
  .required("requiredError")
  .matches(username_REGEX, "usernameError")
  .typeError("typeError");

// email
const emailSchema = yup
  .string()
  .email("emailError")
  .required("requiredError")
  .typeError("typeError");

// name
const nameSchema = yup
  .string()
  .required("requiredError")
  .matches(onlyLetters_REGEX, "onlyNumberError")
  .typeError("typeError");

// surname
const SurnameSchema = yup
  .string()
  .required("requiredError")
  .matches(onlyLetters_REGEX, "onlyNumberError")
  .typeError("typeError");

// coutry name code
const countryPhoneCodeSchema = yup
  .string()
  .required("requiredError")
  .typeError("typeError");

// company name
const companyNameSchema = yup
  .string()
  .required("requiredError")
  .typeError("typeError");

// vatnumber
const VATNumberSchema = yup
  .string()
  .required("requiredError")
  .typeError("typeError");

// date of birth
const dateOfBirthSchema = yup
  .string()
  .required("requiredError")
  .typeError("typeError");

// location
const locationSchema = yup
  .string()
  .required("requiredError")
  .typeError("typeError");

// gender
const genderSchema = yup
  .string()
  .required("requiredError")
  .typeError("typeError");

// phone
const phoneSchema = yup
  .string()
  .required("requiredError")
  .matches(onlynumerics_REGEX, "onlyNumberError")
  .typeError("typeError");

// nationality
const nationalitySchema = yup
  .string()
  .required("requiredError")
  .typeError("typeError");

// job type
const jobTypeSchema = yup
  .string()
  .required("requiredError")
  .typeError("typeError");

// password
const passwordSchema = yup
  .string()
  .required("requiredError")
  .matches(password_REGEX, "passwordError")
  .typeError("typeError");

// repassword
const rePasswordSchema = yup
  .string()
  .required("requiredError")
  .oneOf([yup.ref("password"), ""], "rePasswordError");

// skills
const skillsSchema = yup.array();
// .min(1, 'At least add one skill.')

// languages
const languagesSchema = yup.array();
// .min(1, 'At least add one language.')

const passportNumberSchema = yup
  .string()
  // .matches(passport_REGEX, {
  //   message: 'Please provide a valid passport.',
  //   excludeEmptyString: true,
  // })
  .typeError("typeError");

// visa expiration date
const visaExpirationDateSchema = yup
  .string()
  // .required('requiredError')
  .typeError("typeError");

// bio
const bioSchema = yup
  .string()
  // .required('requiredError')
  .typeError("typeError");

// validate driving license
const validDrivingLicenseSchema = yup.boolean();

// employed
const isEmployedSchema = yup.boolean();

// title job post
const titleSchema = yup
  .string()
  .required("requiredError")
  .typeError("typeError");

// introduction text job post
const introductionTextSchema = yup
  .string()
  // .required('requiredError')
  .typeError("typeError");

// salary job post
const salarySchema = yup
  .string()
  .required("requiredError")
  .typeError("typeError");

// religion job post
const religionSchema = yup
  .string()
  .required("requiredError")
  .typeError("typeError");

// years of experience job post
const yearsOfExperienceSchema = yup
  .string()
  .required("requiredError")
  .matches(onlynumerics_REGEX, "onlyNumberError")
  .typeError("typeError");

// starting date job post
const startingDateSchema = yup
  .string()
  .required("requiredError")
  .typeError("typeError");

// min age job post
const minAgeSchema = yup
  .string()
  .required("requiredError")
  .matches(onlynumerics_REGEX, "onlyNumberError")
  .typeError("typeError");

// max age job post
const maxAgeSchema = yup
  .string()
  .required("requiredError")
  .matches(onlynumerics_REGEX, "onlyNumberError")
  .typeError("typeError");

// description job post
const descriptionSchema = yup
  .string()
  .required("requiredError")
  .typeError("typeError");

// description apply for job
const applicationDescriptionSchema = yup
  .string()
  // .required('requiredError')
  .typeError("typeError");

export {
  usernameSchema,
  emailSchema,
  nameSchema,
  SurnameSchema,
  countryPhoneCodeSchema,
  companyNameSchema,
  VATNumberSchema,
  dateOfBirthSchema,
  locationSchema,
  genderSchema,
  phoneSchema,
  nationalitySchema,
  passwordSchema,
  rePasswordSchema,
  jobTypeSchema,
  validDrivingLicenseSchema,
  isEmployedSchema,
  bioSchema,
  skillsSchema,
  languagesSchema,
  passportNumberSchema,
  visaExpirationDateSchema,
  titleSchema,
  introductionTextSchema,
  salarySchema,
  religionSchema,
  yearsOfExperienceSchema,
  startingDateSchema,
  minAgeSchema,
  maxAgeSchema,
  descriptionSchema,
  applicationDescriptionSchema,
};
