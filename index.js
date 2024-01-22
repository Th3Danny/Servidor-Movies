import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './src/config/db.js';
import indexRoutes from './src/routes/index.routes.js';

import http from 'http';
import { WebSocket, WebSocketServer } from 'ws';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.set('PORT', process.env.PORT || 3000);

app.listen(app.get('PORT'), () => {
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

const server = http.createServer(app);
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
    });

    // Para emitir un mensaje a un cliente específico:
    // socket.send('Hola cliente!');
});
