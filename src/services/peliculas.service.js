import { getPeliculasDto } from "../dtos/peliculas.dto.js";
import * as peliculasRepository from "../repositories/peliculas.repositorie.js";
import { postPelicula } from "../repositories/peliculas.repositorie.js";
import { validatePelicula } from "../validation/peliculas.validation.js";
export const getPeliculasService = async () =>{
  try {
      const results = await peliculasRepository.getPeliculas()
      console.log(results);
      return getPeliculasDto(results)
  }
  catch(err){
      return err;
  }
}


export const getPeliculasIdService = async (id) => {
  try {
    if (id !== undefined && id !== null) { 
      const results = await peliculasRepository.getPeliculasId(id);
      console.log(results);
      return getPeliculasDto(results);
    } else {
      throw new Error("ID no válido"); 
    }
  } catch (err) {
    throw err;
  }
};

  export const postPeliculaServices = async (pelicula) => {
    try {
      const validarPelicula=validatePelicula(pelicula)
      if (validarPelicula.success) {
        const{idpeliculas, nombre, descripcion, linkTriler, director, duracion, diaAgregado, imagen}=pelicula;
        const peliculaRes = await postPelicula(idpeliculas, nombre, descripcion, linkTriler, director, duracion, diaAgregado, imagen)
        return peliculaRes;
      }else{
        throw new Error (validarProducto.error.message)
    }
    } catch (error) {
        throw new Error(`Error in postPeliculaServices: ${error.message}`);
    }
};



  


  

