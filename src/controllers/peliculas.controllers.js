import * as peliculasService from "../services/peliculas.service.js"
export const getPeliculasController = async (req, res) => {
    try{
        const results = await peliculasService.getPeliculasService()
        return res.status(200).json(results)

    }catch(err){
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
  