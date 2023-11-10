import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './filme.css'
import api from "../../services/api";
import { toast } from "react-toastify";

function Filme() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        async function loadDetail(){
            const response = await api.get(`/movie/${id}`, {
                params: {
                    api_key: "41cb7ee647c80ae7d087eaaa493f5be0",
                    language: "pt-BR",
                }
            })
            .then((response)=> {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=> {
                console.log("Filme nao encontrado!");
                navigate("/", { replace: true });
                return;
            })
           
        }

        loadDetail();


        return () => {
            console.log("COMPONENTE FOI DESMONTADO");
        }

    },[navigate, id])

    function salvarFilme () {
        const minhaLista = localStorage.getItem("@devflix");
        
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id)

        if (hasFilme){
            toast.warn("Esse filme já está na sua lista!")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@devflix", JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucesso!")

    }

    if (loading) {
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme} >Salvar</button>
                <a target="_blank" href={`https://www.youtube.com/results?search_query=${filme.title} trailer`}>
                        <button>Trailer</button>
                </a>
            </div>

        </div>
    );
}

export default Filme;