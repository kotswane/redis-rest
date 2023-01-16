import {createKey,getKey,deleteKey} from "../redis-client/client.js"


export function requestServiceToken(user){
    console.log("Service requestServiceToken: ....")
    return getKey(user)
}

export function generateServiceToken(user){
    console.log("Service generateServiceToken: ....")
   var resp = getKey(user)

   return resp.then(
    (success) => {
      console.log("service success: ", success); // Success!
      if (success == null){
          resp = createKey(user)
          return resp.then(
             (createNewKeySuccess) => {
                console.log("service success new key: ", createNewKeySuccess); // Success!
                return "success";    
             },(createNewKeyError)=>{
                console.log("service error new key: ", createNewKeyError); // error!
                return "error"; 
             }
          )
      }
      return "already loggedin";
    },
  );

 }

 export function deleteServiceToken(user){
    console.log("Service deleteServiceToken: ....")
    var resp = deleteKey(user);

    return resp.then(
        (success) => {
            console.log("Service deleteServiceToken success: ", success);
            if (success == 1){
                return "success";
            }else{
                return "error";
            }
        }
    )
 }