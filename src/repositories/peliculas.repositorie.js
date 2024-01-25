import db from "../config/db.js";

export const getPeliculas = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM movies.peliculas"
        db.execute(query)
        .then((res) => {
            
            resolve(res[0])
        })
        .catch((err) => reject(err))
    })
}

export const getPeliculasId = (id) => {
    return new Promise((resolve, reject) => {
      console.log("Valor del ID:", id); 
      const query = "SELECT * FROM movies.peliculas WHERE idpeliculas = ?";
      db.execute(query, [id])
        .then((res) => {
          resolve(res[0]);
        })
        .catch((err) => reject(err));
    });
  };

  export const postPelicula = (idpeliculas, nombre, descripcion, linkTriler, director, duracion, diaAgregado, imagen) => new Promise ((resolve, reject)=>{
    const consulta = "INSERT INTO peliculas (idpeliculas, nombre, descripcion, linkTriler, director, duracion, diaAgregado, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.execute(consulta,[idpeliculas, nombre, descripcion, linkTriler, director, duracion, diaAgregado, imagen])
    .then((res)=>resolve(res))
    .catch((err)=> reject(err))
  }) 

   
 
  
  

