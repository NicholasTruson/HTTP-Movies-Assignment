import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieUpdate = (props) => {

  const [movie, setMovie] = useState({
      id: "",
      title: "",
      director: "",
      metascore: "",
      stars: []
  })

  //const fetchMovie = id => {
  useEffect(() => {
      const id = props.match.params.id;

      axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
          setMovie({
              id: id,
              title: res.data.title,
              director: res.data.director,
              metascore: res.data.metascore,
              stars: res.data.stars,
          })
      })

      .catch(err => console.log(err));

  }, []);

      
  

//useEffect(() => {
 //   fetchMovie(props.match.params.id);
 // }, [props.match.params.id]);

  ////////////////////////////////////////////////////

  const handleChange = e => setMovie({...movie, [e.target.name]: e.target.value});

  const handleStar = index => e => {
    setMovie({...movie, stars: movie.stars.map((star, starIndex) => {
      return starIndex === index ? e.target.value : star;
    })});
  };

  const handleSubmit = event => {
    //event.preventDefault();

    //const movie = {
    //    ...movie,
        
    //};

    axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
      .then(res => {
        console.log(res);
        props.history.push('/');
      })
      .catch(err => console.log(err.response));
  };

  const addStar = e => {
    //event.preventDefault();
    setMovie({...movie, stars: [...movie.stars, ""]});
  };

  if (!movie) {

    return <div>Loading...</div>;

  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text"
             name="title"
             placeholder="title"
             value={movie.title}
             onChange={handleChange} />

      <input type="text"
             name="director"
             placeholder="director"
             value={movie.director}
             onChange={handleChange} />

      <input type="text"
             name="metascore"
             placeholder="metascore"
             value={movie.metascore}
             onChange={handleChange} />



      <button onClick={addStar}>Add Star</button>
      <button type="submit">Update Movie</button>

    </form>
  );
};

export default MovieUpdate