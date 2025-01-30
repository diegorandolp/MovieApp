export default function Card({poster, title, rating, genre, type='Movie'}) {
    return(
        <div className='bg-dark-100 text-white'>
            <img src={poster} alt={title} />
            <h3>{title}</h3>
            <p>{rating}•{genre}•{type}</p>
        </div>
    )
}