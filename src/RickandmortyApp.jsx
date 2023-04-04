import { useEffect } from "react";
import { useState } from "react";
import './RickandmortyApp.css';

export default function AppRickAndMorty() {
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character')
            .then(result => result.json())
            .then(dados => setList(dados.results.filter(x => x.id < 5)))
    }, [])

    return (
        <div>
            <h1 className="app-title">Rick and Morty React App</h1>
            <section>
                <ListarPersonagens list={list}></ListarPersonagens>
            </section>
            
        </div>
    )
}

function ListarPersonagens({list}) {
    return (
        <div className="cards">
            {list.map(personagem => (
                <section className="card" key={personagem.id}>
                    <figure className="char-image">
                        <img src={personagem.image}/>
                    </figure>
                    <section className="card-info">
                        <p className="char-name">{personagem.name}</p>
                        <div className="char-bio">
                            <p>Status: {personagem.status}</p>
                            <p>Genero: {personagem.gender}</p>
                            <p>Especie: {personagem.species}</p>
                            <p>Origem: {personagem.origin.name}</p>
                        </div>
                    </section>
                </section>
            ))}
        </div>
    )
}

