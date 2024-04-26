import { Router } from "express";
import * as peliculasController from "../controllers/peliculas.controllers.js";
import rateLimit from 'express-rate-limit';

const accountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 6, // limita cada IP a 6 peticiones por el tiempo definido con "windowMs"
    message: "Demasiadas peticiones realizadas, intenta despues de 1 hora"
  });

const peliculasRouter = Router();

peliculasRouter.get("/",accountLimiter, peliculasController.getPeliculasController)
peliculasRouter.get("/id/:id", peliculasController.getPeliculasIdController);
peliculasRouter.post("/", peliculasController.postPeliculaController);
peliculasRouter.get('/nuevaNotificacion', peliculasController.getNuevaPelicula);

export default peliculasRouter;