import React, { Component } from 'react';
import { API_KEY, API_TOKEN, API_URL, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../config';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/ForColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';
import './Home.css';

class Home extends Component {
    state = {
        movies: [],
        heroImage: null,
        loading: false,
        currentPage: 0,
        totalPages: 0,
        searchItem: ''
    }
    componentDidMount() {
        this.setState({ loading: true });
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        this.fetchItems(endpoint);
    }
    searchItems = (searchTerm) => {
        let endpoint = '';
        this.setState({
            movies: [],
            loading: true,
            searchItem: searchTerm
        })

        if (searchTerm === "") {
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        } else {
            endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
        }
        this.fetchItems(endpoint);
    }
    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    fetchItems = async (endpoint) => {
        const { movies, heroImage, searchItem } = this.state;

        try {
            const result = await (await fetch(endpoint)).json();
            const _movies = [movies, ...result.results];
            const _heroImage = heroImage || result.results[this.getRandomInt(0, 20)];
            const loading = false;
            const currentPage = result.page;
            const totalPages = result.total_pages;
            this.setState(
                { movies: _movies, heroImage: _heroImage, loading, currentPage, totalPages },
                () => {
                    // Remember state for the next mount  if we are not in a search view
                    if (searchItem === "") {
                        sessionStorage.setItem("HomeState", JSON.stringify(this.state));
                    }
                }
            );
        } catch (error) {
            console.log("Something wrong happen : ", error);
        }


    }


    loadMoreItems = () => {
        let endpoint = '';
        this.setState({ loading: true });

        if (this.state.searchItem === '') {
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1}`;
        } else {
            endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query${this.state.searchItem}&page=${this.state.currentPage + 1}`;

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
                    <SearchBar callback={this.searchItems} />
                </div>}
                <div className="rmdb-home-grid">
                    <FourColGrid
                        header={this.state.searchItem ? 'Search Result' : 'Popular Movies'}
                        loading={this.state.loading}
                    >
                        {this.state.movies.map((element, i) => {
                            return <MovieThumb
                                key={i}
                                clickable={true}
                                image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : './images/no_image.jpg'}
                                movieId={element.id}
                                movieName={element.original_title}
                            ></MovieThumb>
                        })}
                    </FourColGrid>
                    {this.state.loading && <Spinner />}
                    {
                        (this.state.currentPage <= this.state.totalPages && !this.state.loading) &&
                        <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} />
                    }

                </div>
            </div>
        );
    }
}

export default Home;