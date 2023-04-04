import { useEffect } from "react";
import { useState } from "react";
import './RickandmortyApp.css';

export default function AppRickAndMorty() {
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const [selecionados, setSelecionados] = useState([])

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character')
            .then(result => result.json())
            .then(dados => setList(dados.results.filter(x => x.id < 5)))
    }, [])

    const AdicionarPersonagem = (personagem) => {
        if (selecionados.find(p => p.id === personagem.id)) {
            alert('Personagem ja selecionado')
            return
        }

        console.log('Adicionando personagem', personagem)
        setSelecionados(old => [...old, personagem])
    }

    const RemoverPersonagem = (personagem) => {
        console.log('Removendo personagem', personagem)
        setSelecionados(old => [...old.filter(p => p.id !== personagem.id)])
    }

    return (
        <div>
            <h1 className="app-title">Rick and Morty React App</h1>
            <section>
                <h2>Resultados da API</h2>
                <ListarPersonagens list={list} selecionaPersonagem={AdicionarPersonagem}/>
                <button onClick={() => setSelecionados(list)}> Selecionar todos</button>
                <button onClick={() => setSelecionados([])}> Limpar selecao</button>
                <button onClick={() => setSelecionados([list[0]])}>Seleciona Primeiro</button>
            </section>

            <hr />

            <section>
                <h2>Itens Selecionados</h2>
                <ListarPersonagens list={selecionados} selecionaPersonagem={RemoverPersonagem} />
            </section>
            
        </div>
    )
}

function ListarPersonagens({list}) {
    return (
        <div className="cards">
            {list.map(personagem => (
                <section 
                    className="card"
                    key={personagem.id}
                    onClick={() => selecionaPersonagem(personagem)}
                        
                >
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

