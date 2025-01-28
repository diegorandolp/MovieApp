import { useState, useEffect } from 'react'
import Search from './components/Search'

function App(){
    const [searchTerm, setSearchTerm] = useState('')
    return(
      <main>
          <div className="pattern">
          </div>

          <div className="wrapper">
              <header>
                  <img src="hero.png" alt="hero" />
                  <h1>Find <span className="text-gradient">movies</span> that you will enjoy</h1>
              </header>
              <Search searchTerm={searchTerm} setSearchTerm={(newTerm) => {setSearchTerm(newTerm)}}/>

          </div>
      </main>

    )
}

export default App
