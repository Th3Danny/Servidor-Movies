import * as peliculasService from "../services/peliculas.service.js"
import { postPeliculaServices } from "../services/peliculas.service.js"
export const getPeliculasController = async (req, res) => {
  try {
    const results = await peliculasService.getPeliculasService()
    return res.status(200).json(results)

  } catch (err) {
    return res.status(400).json(err.message)

  }
}

export const getPeliculasIdController = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    if (id !== undefined) {
      const results = await peliculasService.getPeliculasIdService(id);
      console.log(results);
      return res.status(200).json(results);
    } else {
      return res.status(400).json("ID indefinido");
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json(err.message);
  }
};


//Long polling----------------------------------------------------------------------------------------------
let resClientesPeliculaAgregada = [];

export const getNuevaPelicula = async (req, res) => {
  resClientesPeliculaAgregada.push(res)
  req.on('close', () => {
    const index = resClientesPeliculaAgregada.indexOf(res);
    if (index !== -1) {
      resClientesPeliculaAgregada.splice(index, 1);
    }

  });

};


export const postPeliculaController = async (req, res) => {
  try {
    const pelicula = req.body;
    const response = await postPeliculaServices(pelicula)
    responderClientesActualizaciones(pelicula)
    res.status(200).json(pelicula)
  } catch (err) {
    console.error(err);
    return res.status(400).json(err.message);
  }


};

function responderClientesActualizaciones(nuevaActualizacion) {
  for (const res of resClientesPeliculaAgregada) {
    res.status(200).json({ message: `Se agrego una nueva pelicula ${nuevaActualizacion.nombre}` })
  }
  resClientesPeliculaAgregada = []
}