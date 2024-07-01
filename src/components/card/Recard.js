import React, {useEffect, useState} from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "./card.css"
import { Link } from "react-router-dom"
import axios from "axios"

const Cards = ({movie}) => {

    const [isLoading, setIsLoading] = useState(true)
    const [image, setImage] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }, []) 

  useEffect(() => {
      console.log("This is in recards===>",movie)
    const fetchImage = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.movie_id}/images?api_key=45bfb2f547ce6aae28bda7a953d1d52d`);
        if (response.data.posters && response.data.posters.length > 0) {
          setImage(response.data.posters[0].file_path);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchImage();
  }, [movie.movie_id]);
  

    return <>
    {
        isLoading
        ?
        <div className="cards">
            <SkeletonTheme color="#202020" highlightColor="#444">
                <Skeleton height={300} duration={2} />
            </SkeletonTheme>
        </div>
        :
        <Link to={`/movie/${movie.movie_id}/${movie.title}`} style={{textDecoration:"none", color:"white"}}>
            <div className="cards">
                <img className="cards__img" src={`https://image.tmdb.org/t/p/original${movie?image:""}`} />
                <div className="cards__overlay">
                    <div className="card__title">{movie?movie.title:""}</div>
                    {/* <div className="card__runtime">
                        {movie?movie.release_date:""}
                        <span className="card__rating">{movie?movie.vote_average:""}<i className="fas fa-star" /></span>
                    </div> */}
                    {/* <div className="card__description">{movie ? movie.overview.slice(0,118)+"..." : ""}</div> */}
                </div>
            </div>
        </Link>
    }
    </>
}

export default Cards