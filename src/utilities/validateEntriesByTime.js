import { isEmpty } from "lodash";
import validator from "validator";

export default function({ year }){
  let errors = {};
  if(validator.isEmpty(year)){
    errors.year = "Year is required";
  } else {
    errors = {};
  }
  return {
    isValid: isEmpty(errors),
    errors
  };
}
