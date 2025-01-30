import {useState, useEffect} from 'react'
import Search from './components/Search'

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

    async function fetchMovies() {

        setIsLoading(true)
        setError('')

        try {
            const endpoint = `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
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


    useEffect(() => {
        fetchMovies()
    }, [])

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
                    <h2>Popular Movies</h2>
                    {isLoading ?
                        (<p className="text-white">Loading...</p>) : error ?
                            (<p className="text-red-500">{error}</p>) :
                            (<ul>
                                {movies.map((movie) => (
                                    <p key={movie.id} className="text-white">{movie.title}</p>
                                ))}
                            </ul>)}
                </section>
            </div>
        </main>

    )
}

export default App
