import axios from "axios";

//BASE DA API: https://api.themoviedb.org/3
//URL DA API: https://api.themoviedb.org/3/movie/now_playing?api_key=41cb7ee647c80ae7d087eaaa493f5be0&language=pt-BR

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3"
})

export default api;