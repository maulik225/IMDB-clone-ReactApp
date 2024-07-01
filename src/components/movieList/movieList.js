import React, {useEffect, useState} from "react"
import "./movieList.css"
import { useParams } from "react-router-dom"
import Cards from "../card/card"
import axios from "axios"


const MovieList = () => {
    
    const [movieList, setMovieList] = useState([])
    const [page,setPage] = useState(1)
    const [perPage,setPerPage] = useState(100)
    const {type} = useParams()

    useEffect(() => {
        setTimeout(() => {
          }, "4000");
        getData()
    }, [])

    useEffect(() => {
        getData()
    }, [type])
    
    const getData = () => {
        axios.get(`http://127.0.0.1:8000/movieinfo?page=${page}&per_page=${perPage}`)
        .then((data) => {
            setMovieList(data.data.movies)
        }).catch((err)=>{
            console.log(err)
        })
    }
   
    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards">
                {
                    movieList.map(movie => (
                        <Cards movie={movie} />
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList