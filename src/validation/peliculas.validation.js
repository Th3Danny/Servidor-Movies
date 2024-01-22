import z from "zod";

const peliculasScham = z.object ({
    idpeliculas: z.string({
        invalid_type_error: "idPelicula tiene que ser creado"
    }).optional(),

    nombre: z.string({
        invalid_type_error: "nombre tiene que ser estring",
        required_error: "nombre is required "
      }),

      descripcion: z.string({
        invalid_type_error: "descripcion tiene que ser estring",
        required_error: "descripcion is required "
      }),

      linkTriler: z.string({
        invalid_type_error: "link tiene que ser estring",
        required_error: "link is required "
      }),

      director: z.string({
        invalid_type_error: "director tiene que ser estring",
        required_error: "director is required "
      }),

      duracion: z.number({
        invalid_type_error: "duracion tiene que ser number",
        required_error: "fecha is required "
      }),

      diaAgregado: z.coerce.date({
        invalid_type_error: "fecha tiene que ser date",
        required_error: "fecha is required "
      }),

      imagen: z.string({
        invalid_type_error: "imagen tiene que ser estring",
        required_error: "imagen is required "
      }),


})

export function validatePelicula(pelicula){
    return peliculasScham.safeParse(pelicula)
}

export function validatePartialPelicula(pelicula){
    return peliculasScham.safeParse(pelicula)
}