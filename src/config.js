// Configuration for TMDB
// To se the latest configuration fetch it from https://api.themoviedb.org/3/configuration?api_key=019e8f375549e0bbd4a4191862ebc88f

const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '14625749ffebc61dc14ec79c80f39fd4';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDYyNTc0OWZmZWJjNjFkYzE0ZWM3OWM4MGYzOWZkNCIsInN1YiI6IjVkZWQ4ZWU5MzI0ODliMDAxMmMyNTg3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OjLmqw25pc_wmvq2Mud1dR0vXHY1JoSBMAO2Z7AC6j8';


// Images
// An image URL looks like this example:
// http://image.tmdb.org/t/p/w780/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg

const IMAGE_BASE_URL ='http://image.tmdb.org/t/p/';

//Sizes: w300, w780, w1280, original
const BACKDROP_SIZE = 'w1280';

// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE = 'w500';

export {
  API_URL,
  API_KEY,
  API_TOKEN,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE
}