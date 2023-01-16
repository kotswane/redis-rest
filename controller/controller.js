import {requestServiceToken,generateServiceToken,deleteServiceToken} from "../service/service.js"
import {apiValidator} from "../utils/utils.js"
import {user,apiResponse} from "../model/user.js"


export function generateToken(req, res){
    res.setHeader('Content-Type', 'application/json')
    console.log(`Controller generateToken: ......`)
    user.id = req.body.id
    user.site = req.body.site
    
    var result = apiValidator(user)
    if ( result.status == "error"){
        console.error(result)
        return res.status(400).json(result)
    }

    var response = generateServiceToken(user)
    var status;
    response.then(
        (token)=>{
            result.status = "error"
            if(token == "already loggedin"){
                result.message = "token already exists";
                status = 400;
            }else if(token == "success"){
                result.message = "token generated successfully";
                result.status = "success"
                status = 200;
            }else{
                result.message = "failed";
                status = 500;
            }
            return res.status(status).json(result)
        }

    )
    }

export function requestToken(req, res){
    res.setHeader('Content-Type', 'application/json')
    
    user.id = req.body.id
    user.site = req.body.site
    console.log(`Controller requestToken: ......${user}`)
    var result = apiValidator(user)
    if ( result.status == "error"){
        console.error(result)
        return res.status(400).json(result)
    }

    var response = requestServiceToken(user)
    var status;
    result.status = "error"
    response.then(
        (token)=>{
            if((token == "") || (token == null)){
                result.message = "token not found";
                status = 404;
            }else if((token != "") || (token != null)){
                result.message = token;
                result.status = "success";
                status = 200;
            }
            return res.status(status).json(result);
        }

    )
  
}

export function deleteToken(req, res){
    res.setHeader('Content-Type', 'application/json')
    
    user.id = req.body.id
    user.site = req.body.site
    console.log(`Controller deleteToken: ......${user.id}`)
    var result = apiValidator(user);
    if ( result.status == "error"){
        console.error(result)
        return res.status(400).json(result);
    }

    var response = deleteServiceToken(user);
    var status;
    result.status = "error"
    response.then(
        (token)=>{
            console.log("controller: ", token)
            if(token != "success"){
                result.message = "could not delete token";
                status = 404;
            }else if(token == "success"){
                result.message = "token deleted successfully";
                result.status = "success"
                status = 200;
            }
            return res.status(status).json(result);
        }

    )
}

export function healthCheck(req, res){
	res.setHeader('Content-Type', 'application/json');
	apiResponse.message = "ok";
	apiResponse.status = "success";
	return res.status(200).json(apiResponse);
}
