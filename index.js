import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './src/config/db.js';
import indexRoutes from './src/routes/index.routes.js';
import rateLimit from 'express-rate-limit';
import { createServer } from "http";
import { WebSocket, WebSocketServer } from 'ws';
import ConectarSocket from './src/socketIo/Socket.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.set('PORT', process.env.PORT || 3000);
const server = createServer(app);



const accountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 6, 
    message: "Demasiadas peticiones realizadas, intenta despues de 1 hora"
  });

  app.get("/", accountLimiter, (req, res) => {
    res.send('hola mundo ...')
  });

  app.post('/create-account', accountLimiter, (req, res) => {
    res.send('Cuenta creada');
 })

server.listen(app.get('PORT'), () => {
    console.log('Escuchando en el puerto ' + app.get('PORT'));
});

app.use('/', indexRoutes);

app.use('*', (req, res) => {
    res.status(400).json('Este endpoint no existe');
});

db.connect()
    .then(() => {
        console.log('Base de datos conectada');
    })
    .catch((err) => {
        console.error(err);
    });
    ConectarSocket(server);


// const server = createServer(app);

const wss = new WebSocketServer({ port: 3002 });

wss.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('message', (data) => {
        try {
            const dataRecibida = JSON.parse(data.toString());
            console.log('Mensaje recibido:', dataRecibida);

            // Realizar acciones necesarias y enviar una respuesta si es necesario
            socket.send(JSON.stringify(dataRecibida));
        } catch (error) {
            console.error('Error al parsear el mensaje:', error);
        }
    });

    socket.on('close', () => {
        console.log('Usuario desconectado');
    })
        
    });
    




//Long Polling-------------------------------------------------------------------------------------------------
const peliculaNotificacion = [
    {id: 1, notification: "Una nueva pelicula agregada"}, 
    {id: 2, notification: "Se elimino una nueva pelicula"} 
  ]
  
  let resPeliculasNotificaciones = [];
  
  app.get('/notificaciones', (req, res) => {
    res.status(200).json({
        success: true,
        notificaciones: peliculaNotificacion
    });
});

  
  app.get('/nueva-notificacion', (req, res) => {
    resPeliculasNotificaciones.push(res);
  
    req.on('close', () => {
        const index = resPeliculasNotificaciones.indexOf(res);
        if (index !== -1) {
            resPeliculasNotificaciones.splice(index, 1);
        }
    });
  });
  
  app.post('/notificaciones', (req, res) => {
    let idNotificaciones = peliculaNotificacion.length > 0 ? peliculaNotificacion[peliculaNotificacion.length - 1].id + 1 : 1;
  
    const nuevaNotificacion = {
        id: idNotificaciones,
        notificacion: req.body.notificacion
    };
  
    peliculaNotificacion.push(nuevaNotificacion);
  
  
    responderPeliculasNuevas(nuevaNotificacion);
  
    res.status(201).json({
        success: true,
        message: "pelicula creada"
    });
  });
  
  function responderPeliculasNuevas(nuevaNotificacion) {
    for (let i = 0; i < resPeliculasNotificaciones.length; i++) {
        const res = resPeliculasNotificaciones[i];
        try {
            res.status(200).json({
                success: true,
                notificacion: nuevaNotificacion
            });
        } catch (error) {
            console.error('Error al enviar actualización de la película:', error.message);
        }
    }
  }
  