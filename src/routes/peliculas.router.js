import { Router } from "express";
import * as peliculasController from "../controllers/peliculas.controllers.js";

const peliculasRouter = Router();

peliculasRouter.get("/", peliculasController.getPeliculasController)
peliculasRouter.get("/id/:id", peliculasController.getPeliculasIdController);
peliculasRouter.post("/", peliculasController.postPeliculaController);
peliculasRouter.get('/nuevaNotificacion', peliculasController.getNuevaPelicula);

export default peliculasRouter;