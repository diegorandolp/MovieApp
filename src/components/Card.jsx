export default function Card({poster, title, rating, genre, type='Movie'}) {
    return(
        <div className='movie-card'>
            <img src={poster} alt={title} />
            <div className="mt-4">
                <h3>{title}</h3>
                <div className="content">
                    <div className="rating">
                        <img src="star.svg" alt="star"/>
                        <p>{rating.toFixed(1)} • {genre} • {type}</p>
                    </div>

                </div>

            </div>
        </div>
    )
}