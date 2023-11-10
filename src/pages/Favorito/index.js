
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './favoritos.css'
import { toast } from 'react-toastify';

function Favoritos(){

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {

        const minhaLista = localStorage.getItem("@devflix");
        setFilmes(JSON.parse(minhaLista) || [])

    }, [])

    function excluirFilme(id){
        let filtroFilmes = filmes.filter( (item) => {
            return (item.id !== id)
        } )

        setFilmes(filtroFilmes)
        localStorage.setItem("@devflix", JSON.stringify(filtroFilmes))
        toast.success("Filme removido com sucesso!")
    }

    return(
        <div className='meus-filmes'>
            <h1>Meus filmes</h1>

            {filmes.length === 0 && 
            <div className='lista-vazia'>
                <span>Você não possui nenhum filme salvo. </span>
                <Link to="/">Explorar Filmes</Link>
            </div>}

            <ul>
                {filmes.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;