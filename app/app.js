import express from "express";
import bodyParser from  "body-parser"
import {requestToken,generateToken,deleteToken} from "../controller/controller.js"

//const PORT = process.env.REDIS_API_SERVER_PORT;

const PORT = 5000;

module.exports = function (app) {
    console.log("starting API ....");
    app.use(bodyParser.json());
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
    app.use(express.json({type: '*/*'}));
    // #swagger.start
    // #swagger.tags = ['Token API']
    // #swagger.description = 'This endpoint generates a  token for a specific website and cache it in Redis server'
    // #swagger.summary = 'This endpoint generates a  token for a specific website and cache it in Redis server'
    // #swagger.operationId = 'generateToken'
    // #swagger.produces = ["application/json"]
    // #swagger.consumes = ["application/json"]
    /* #swagger.parameters['user'] = {
            in: 'body',
            description: 'JSON object input',
            required: true,
            schema: {
                $id: '12',
                $site: 'datawarehouse'
            }
    } 
    #swagger.responses[200] = {
            description: 'Successful response',
            schema: {
                message: 'token generated successfully',
                status: 'success'
            }
    } 
    #swagger.responses[400] = {
            description: 'Unsuccessful response',
            schema: {
                message: 'token already exists',
                status: 'error'
            }
    }
    #swagger.responses[500] = {
            description: 'Unsuccessful response',
            schema: {
                message: 'failed',
                status: 'error'
            }
    }
    
    #swagger.start
    */
    app.post('/api/generate',generateToken);

    // #swagger.start
    // #swagger.tags = ['Token API']
    // #swagger.description = 'This endpoint reads a token for a specific website from Redis server'
    // #swagger.summary = 'This endpoint reads a token for a specific website from Redis server'
    // #swagger.operationId = 'requestToken'
    // #swagger.produces = ["application/json"]
    // #swagger.consumes = ["application/json"]
    /* #swagger.parameters['user'] = {
            in: 'body',
            description: 'JSON object input',
            required: true,
            schema: {
                $id: '12',
                $site: 'datawarehouse'
            }
    } 
    #swagger.responses[200] = {
            description: 'Successful response',
            schema: {
                message: 'datawarehouse-a7189cc2-a306-4246-a3c3-05409ebb26ac',
                status: 'success'
            }
    } 
    #swagger.responses[404] = {
            description: 'Unsuccessful response',
            schema: {
                message: 'token not found',
                status: 'error'
            }
    }
    #swagger.start
    */
    
    app.post('/api/request',requestToken);
    // #swagger.start
    // #swagger.tags = ['Token API']
    // #swagger.description = 'This endpoint delets a token for a specific website from Redis server'
    // #swagger.summary = 'This endpoint delets a token for a specific website from Redis server'
    // #swagger.operationId = 'deleteToken'
    // #swagger.produces = ["application/json"]
    // #swagger.consumes = ["application/json"]
    /* #swagger.parameters['user'] = {
            in: 'body',
            description: 'JSON object input',
            required: true,
            schema: {
                $id: '12',
                $site: 'datawarehouse'
            }
    } 
    #swagger.responses[200] = {
            description: 'Successful response',
            schema: {
                message: 'datawarehouse-a7189cc2-a306-4246-a3c3-05409ebb26ac',
                status: 'success'
            }
    } 
    #swagger.responses[404] = {
            description: 'Unsuccessful response',
            schema: {
                message: 'token not found',
                status: 'error'
            }
    }
    #swagger.start
    */
    app.post('/api/delete',deleteToken);
    app.listen(PORT,() => console.log(`Server running on port: ${PORT}`)); 
}

//export default function startApp() {
 
//}
