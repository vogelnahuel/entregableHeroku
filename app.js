const Servidor = require("./model/server");
const log4js = require('log4js');
require("dotenv").config();
log4js.configure({
    appenders:{
        miLoggerConsole :{type:'console'},
        miLoggerFile:{type:'File',filename:'info.log'}
    },
    categories:{
        default:{
            appenders:['miLoggerConsole'],
            level:'trace'
        },
        consola:{
            appenders:['miLoggerConsole'],
            level:'debug'
        },
        archivo:{
            appenders:['miLoggerFile'],
            level:'warn'
        },
        todos:{
            appenders:['miLoggerConsole','miLoggerFile'],
            level:'error'
        }
    }
})

const server = new Servidor();

server.listen();
