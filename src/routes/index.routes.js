import { Router } from "express";
import peliculasRouter from "./peliculas.router.js";

const prefijo = "api"

const indexRouter = Router()

indexRouter.use(`/${prefijo}/peliculas`, peliculasRouter);

export default indexRouter;