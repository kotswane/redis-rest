import {rules,apiResponse} from "../model/user.js"
import { make } from 'simple-body-validator';
import { v4 as uuidv4 } from 'uuid';


export function apiValidator(user){
    
    const validator = make(user, rules);
    if (! validator.stopOnFirstFailure().validate()) {
        apiResponse.message = validator.errors().first();
        apiResponse.status = "error"
        console.log("ERROR: ",apiResponse)
        return apiResponse
    }
    apiResponse.status = "success"
   return apiResponse
}

export function uuidGenerator(){
  return uuidv4();
}