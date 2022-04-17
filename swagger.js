const options = {
    //openapi: "Disable" , // Enable/Disable OpenAPI. By default is null
    //language: "en-US", // Change response language. By default is 'en-US'
    //disableLogs: false , // Enable/Disable logs. By default is false
    //autoHeaders: true, // Enable/Disable automatic headers capture. By default is true
    //autoQuery: true, // Enable/Disable automatic query capture. By default is true
    //autoBody: true // Enable/Disable automatic body capture. By default is true
}
const swaggerAutogen = require('swagger-autogen')(options);

const doc = {
    tags: [
        // by default: empty Array
        {
            name: 'member',
            description: '使用者'
        },
        {
            name: 'store',
            description: '商家後台管理'
        },
        {
            name: 'business',
            description: '商家營業模式'
        }
    ],
    definitions: {
        code: true,
        id: "6211e1afb27988329badd497",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGdvcml0aG0iOiJIUzI1NiIsImV4cCI6MTY1MDEyMTc1MCwiZGF0YSI6IjYyNWFkMDE2NzI0MGNhMzgzOWZlYmQwNSIsImlhdCI6MTY1MDExOTk1MH0.zK_jiJATx4W1INvg1yJsWnn_cnXjD2oc38DaRVTTx8k",
        order: [{
            id: { $ref: '#/definitions/id' },
            count: 4,
            note: "熱"
        }]
    }
}

const outputFile = './api-docs.json'
const endpointsFiles = ['./app.js']

swaggerAutogen(outputFile, endpointsFiles, doc);