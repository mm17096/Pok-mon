import { useState, useEffect } from 'react';
/* Exportar librerias de Bootstrap */
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Figure from 'react-bootstrap/Figure';
/* Exportar librerias de Bootstrap */
import { getPokemons } from '../controller/getpokemon'; //Servicio
import { Pokemon } from '../models/pokemon.model'; //Modelo

/* El método slice() devuelve una copia de una parte del array dentro de un nuevo array empezando por inicio hasta fin (fin no incluido). El array original no se modificará. */

const Listado = () => {

    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [query, setQuery] = useState("");
    const [imagen, setImagen] = useState(false);

    useEffect(() => {
        const ObtenerTodos = async () => {
            const allPokemons = await getPokemons();
            setPokemons(allPokemons);
        }
        ObtenerTodos();
    });

    const filtrarPokemon = pokemons?.slice(0, 262).filter((pokemon) => {
        return pokemon.name.toLowerCase().match(query.toLowerCase());
    });

    return (
        <div>
            <p className="title">Informacion de Pokemons-API</p>

            <div className='row gap-3'>
                <div className='col-2'>
                    <header className='content-wrapper gap-3 p-2 m-2'>

                        <div className="group">
                            <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                            <input value={query}
                                placeholder='Buscar Pokémon...'
                                onChange={(event) => setQuery(event.target.value.trim())} type="search" className="input" />
                        </div>

                    </header>
                </div>

                <div className='col-2'>
                    <header className='content-wrapper gap-3 p-2 m-2'>
                        <div className="radio-inputs">
                            <label className="radio">
                                <input type="radio" name="radio" defaultChecked onClick={(event) => setImagen(false)} />
                                <span className="name">Imagen Gif</span>
                            </label>

                            <label className="radio">
                                <input type="radio" name="radio" onClick={(event) => setImagen(true)} />
                                <span className="name">Imagen Estática</span>
                            </label>
                        </div>
                    </header>
                </div>

            </div>

            <div className='content-wrapper'>
                <div className='content'>
                    <div className='row gap-3 m-1 p-0'>
                        {filtrarPokemon && filtrarPokemon.length > 0 ? (
                            filtrarPokemon?.slice(0, 262).map((pokemon) => (
                                <Card className='plan mx-auto p-2' style={{ width: '18rem' }}>
                                    <Card.Header><b>Tipo:</b> {pokemon.type}</Card.Header>
                                    <Card.Img width='80' height='100' variant="top" src={imagen ? pokemon.imglarge : pokemon.imggif} className='d-block mx-auto w-50' />
                                    <Card.Body>
                                        <Card.Title className='text-center'>{pokemon.id} - {pokemon.name}</Card.Title>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <Figure.Image
                                                    width={20}
                                                    height={20}
                                                    src="https://t3.ftcdn.net/jpg/01/58/33/14/240_F_158331462_DOoG5h2KpyBdrJLEBsHbBvAVm382wBF0.jpg"
                                                /> <b>HP:</b> {pokemon.hp}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Figure.Image
                                                    width={17}
                                                    height={17}
                                                    src="https://cdn-icons-png.flaticon.com/128/1037/1037908.png"
                                                /> <b>Ataque:</b> {pokemon.attack}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Figure.Image
                                                    width={17}
                                                    height={17}
                                                    src="https://cdn-icons-png.flaticon.com/128/1037/1037906.png"
                                                /> <b>Defensa:</b> {pokemon.defense}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Figure.Image
                                                    width={17}
                                                    height={17}
                                                    src="https://cdn-icons-png.flaticon.com/128/3311/3311830.png"
                                                /> <b>E.Ataque:</b> {pokemon.sp_atk}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Figure.Image
                                                    width={17}
                                                    height={17}
                                                    src="https://cdn-icons-png.flaticon.com/128/3311/3311830.png"
                                                /> <b>E.Defensa:</b> {pokemon.sp_def}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Figure.Image
                                                    width={17}
                                                    height={17}
                                                    src="https://cdn-icons-png.flaticon.com/128/1026/1026026.png"
                                                /> <b>Velocidad:</b> {pokemon.speed}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            ))
                        ) : (
                            <div className="text-center">No hay Pokémones para mostrar</div>
                        )}

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Listado;