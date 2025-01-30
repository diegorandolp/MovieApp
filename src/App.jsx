import {useState, useEffect} from 'react'
import Search from './components/Search'
import Spinner from "./components/Spinner.jsx"
import Card from './components/Card'

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}


function App() {
    const [searchTerm, setSearchTerm] = useState('')
    const [error, setError] = useState('')
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [genres, setGenres] = useState({})

    async function fetchMovies(query) {

        setIsLoading(true)
        setError('')

        try {
            let endpoint = `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`

            if (query) {
                endpoint = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`

            }
            const response = await fetch(endpoint, API_OPTIONS)

            if (!response.ok) {
                throw new Error('An error occurred while fetching movies.')
            }

            const data = await response.json()
            console.log(data)

            if (data.Response === 'False') {
                setError(data.Error || 'An error occurred while fetching movies.')
                setMovies([])
                return;
            }

            setMovies(data.results || [])
        } catch (error) {
            console.error(`Error in fetchMovies: ${error}`)
            setError('An error occurred while fetching movies. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }


    async function fetchGenres() {

        try {
            const endpoint = `${API_BASE_URL}/genre/movie/list`
            const response = await fetch(endpoint, API_OPTIONS)

            if (!response.ok) {
                throw new Error('An error occurred while fetching genres.')
            }

            const data = await response.json()
            console.log(data)

            if (data.Response === 'False') {
                setGenres([])
                return;
            }
            let temp = {}
            for (let genre of data.genres){
                temp[genre.id] = genre.name
            }

            setGenres(temp || [])
        } catch (error) {
            console.error(`Error in fetchMovies: ${error}`)
        }
    }

    useEffect(() => {
        fetchMovies(searchTerm)
        fetchGenres()
    }, [searchTerm])

    return (
        <main>
            <div className="pattern">
            </div>

            <div className="wrapper">
                <header>
                    <img src="hero.png" alt="hero"/>
                    <h1>Find <span className="text-gradient">movies</span> that you will enjoy</h1>
                </header>


                <Search searchTerm={searchTerm} setSearchTerm={(newTerm) => {
                    setSearchTerm(newTerm)
                }}/>

                <section className="all-movies">
                    <h2 className="mt-[40px]">Popular Movies</h2>
                    {isLoading ?
                        (<Spinner/>) : error ?
                            (<p className="text-red-500">{error}</p>) :
                            (<ul>
                                {movies.map((movie) => (
                                    <Card
                                        key={movie.id}
                                        poster={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'no-movie.png'}
                                        title={movie.title}
                                        rating={movie.vote_average ? movie.vote_average: 0}
                                        genre={ (movie.genre_ids === undefined || movie.genre_ids.length === 0) ? 'Unknown' : genres[movie.genre_ids[0]] }
                                        type='Movie'
                                    />
                                ))}
                            </ul>)}
                </section>
            </div>
        </main>

    )
}

export default App
