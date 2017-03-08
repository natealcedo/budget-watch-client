import validator from "validator";
import { isEmpty } from "lodash";

function validateEntryForm(data){
  const { amount, description, category, day, month, year } = data;
  const errors = {};
  if(validator.isEmpty(amount)){
    errors.amount = "This field is required";
  }  
  if(isNaN(amount)){
    errors.amount = "Amount must be a number";
  }
  if(validator.isEmpty(description)){
    errors.description = "This field is required";
  }
  if(validator.isEmpty(category)){
    errors.category = "This field is required";
  }
  if(validator.isEmpty(day)){
    errors.day = "This field is required";
  }
  if(validator.isEmpty(month)){
    errors.month = "This field is required";
  }
  if(validator.isEmpty(year)){
    errors.year = "This field is required";
  }
  return {
    isValid: isEmpty(errors),
    errors
  };
}

export default validateEntryForm;
