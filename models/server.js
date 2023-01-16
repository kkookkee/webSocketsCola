const express = require('express')
const cors = require('cors');
const { socketController } = require('../controllers/sockets/controller');
const app = express()

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
       
        //middleware
        this.middlewares()
        //rutas
        this.routes()

        this.sockets()
    }
    sockets(){
        this.io.on('connection',socketController)
    }

    middlewares(){
        //CORS
        this.app.use(cors())
        //Directorio publico
        this.app.use(express.static('public'))
    }

    routes(){
        //this.app.use(this.usuariosPath,require('../routes/user.routes'))
    }

    listen(){
        this.server.listen(this.port,()=>{
            console.log('Corriendo en el puerto: ',this.port);
        })
    }
}

module.exports = Server;