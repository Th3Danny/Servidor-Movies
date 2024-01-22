import { Router } from "express";
import * as peliculasController from "../controllers/peliculas.controllers.js";

const peliculasRouter = Router();

peliculasRouter.get("/", peliculasController.getPeliculasController)
peliculasRouter.get("/:id", peliculasController.getPeliculasIdController);



export default peliculasRouter;