import React, { Component } from 'react';
import {API_URL, API_KEY} from '../../config';
import Navigation from '../elements/Navigation/Navigation';
import MovieInfoBar from '../elements/MovieInfoBar/MovieInfoBar';
import MovieInfo from '../elements/MovieInfo/MovieInfo';
import Actor from '../elements/Actor/Actor';
import ForColGrid from '../elements/FourColGrid/ForColGrid';
import Spinner from '../elements/Spinner/Spinner';
import './Movie.css';

class Movie extends Component {
    state = {
        movie:null,
        actors: null,
        directors:[],
        loading: false
    }
    componentDidMount(){
        this.setState({loading: true})
        const { movieId } = this.props.match.params;

        // First Fetch the movie ...
        let endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        this.fetchItems(endpoint);
    }

    fetchItems = (endpoint) => {
        // ES6 destructuring the props
        const { movieId } = this.props.match.params;
    
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            console.log('result: ',result);
          if (result.status_code) {
            // If we don't find any movie
            this.setState({ loading: false });
          } else {
            this.setState({ movie: result }, () => {
              // ... then fetch actors in the setState callback function
              let endpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
              fetch(endpoint)
              .then(result => result.json())
              .then(result => {
    
                const directors = result.crew.filter( (member) => member.job === "Director");
    
                this.setState({
                  actors: result.cast,
                  directors,
                  loading: false
                }, () => {
                  localStorage.setItem(`${movieId}`, JSON.stringify(this.state));
                })
              })
            })
          }
        })
        .catch(error => console.error('Error:', error))
      }

    render() { 
        return ( 
            <div className="rmdb-movie">
                <Navigation/>
                <MovieInfo/>
                <MovieInfoBar/>
                {/* <ForColGrid/> */}
                <Spinner/>
            </div>
         );
    }
}
 
export default Movie;