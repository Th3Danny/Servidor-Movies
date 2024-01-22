export function getPeliculasDto(peliculas){
    const arr=[];
    peliculas.forEach((peliculas) => {
        arr.push({
            idpeliculas: peliculas.idpeliculas || " ",
            nombre: peliculas.nombre || " ",
            descripcion: peliculas.descripcion || " ",
            linkTriller: peliculas.linkTriler || " ",
            director: peliculas.director || " ",
            duracion: peliculas.duracion || " ",
            diaAgregado: peliculas.diaAgregado || " ",
            imagen: peliculas.imagen || " ",
        })
        
    });
    return arr;
}