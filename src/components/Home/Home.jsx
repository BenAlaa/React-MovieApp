import React, { Component } from 'react';
import {API_KEY,API_TOKEN,API_URL,IMAGE_BASE_URL,POSTER_SIZE,BACKDROP_SIZE} from '../../config';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/ForColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';
import './Home.css';

class Home extends Component {
    state = {  
        movies:[],
        heroImage: null,
        loading:false,
        currentPage:0,
        totalPages:0,
        searchItem:''
    }
    componentDidMount(){
        this.setState({loading:true});
        const endpoint =`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        this.fetchItems(endpoint);
    }


    fetchItems = (endpoint) => {
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            const movies =[...this.state.movies, ...result.results];
            const heroImage = this.state.heroImage || result.results[0];
            const loading = false;
            const currentPage = result.page;
            const totalPages = result.total_pages;
            this.setState({movies,heroImage,loading,currentPage,totalPages});

        });
    }

    loadMoreItems = () => {
        const endpoint = '';
        this.setState({loading:true});

        if (this.state.searchItem === '') {
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage+1}`;
        } else {
            endpoint=`${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query${this.state.searchItem}&page=${this.state.currentPage+1}`;
            
        }
        this.fetchItems(endpoint);
    }
    render() {
        return ( 
            
            <div className="rmdb-home">
                {this.state.heroImage && <div>
                    <HeroImage  
                        image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
                        title={this.state.heroImage.original_title}
                        text={this.state.heroImage.overview}
                        />
                    <SearchBar />
                </div>}
                <div>
                    <FourColGrid />
                    <Spinner />
                    <LoadMoreBtn />
                </div>
            </div>
         );
    }
}
 
export default Home;