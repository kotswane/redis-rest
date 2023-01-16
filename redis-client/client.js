import Redis from 'ioredis'
import {uuidGenerator} from "../utils/utils.js"
import fs from 'fs'
import { user } from '../model/user.js';



export async function getKey(data){
    console.log(`Redis client: getKey ... ${data.id+"-"+data.site}`)

    const redisClient = connectRedis();
 
    
     return await redisClient.get(`${data.id}-${data.site}`, (err, result) => {
        // If that key exist in Redis store
        if (result) {
            console.log("Redis client: getKey ... ", result)
            redisClient.quit();
          return result;
        } else { // Key does not exist in Redis store
            redisClient.quit();
          return "";
        }
    });
    
}

export async function createKey(data){
    console.log(`Redis client: createKey ... ${data.id+"-"+data.site}`)

    const redisClient = connectRedis();

    
     return await redisClient.set(data.id+"-"+data.site,  data.site+"-"+uuidGenerator(), 'EX',5*60, (err, result) => {
       
        if (result) {
            console.log("result: ",result)
            redisClient.quit();
            var resp = getKey(user);
            resp.then(
                (success) => {
                  console.log("Redis client: createKey setKey: ", success); // Success!
                  return success;
                },
                (error) => {
                  console.error(error); // Error!
                  redisClient.quit();
                  return "";
                },
              );
          } else { // Key does not exist in Redis store
            redisClient.quit();
            return "";
          }
    });
}

export function deleteKey(data){
    const redisClient = connectRedis();
   return redisClient.del(data.id+"-"+data.site, (err, response)=>{
        if (response == 1) {
            console.log(`Redis client deleteKey: Deleted ${response} Successfully!`);
            redisClient.quit();
            return response;
         } else{
            console.error(err); // Error!
            console.log(`Redis client deleteKey Cannot delete ${data.id-data.site}`);
            redisClient.quit();
            return "";
         }
    })
    
}

function connectRedis(){
	
    const redisClient = new Redis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD
    });

    return redisClient;
}