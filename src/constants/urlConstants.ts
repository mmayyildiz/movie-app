import { MediaType } from "../models/MediaType";

export const API_KEY = "92a3a05b637c2f8bc339ab1807ff8a60";
export const BASE_URL = "https://api.themoviedb.org/3/";

export const SEARCH_MOVIE_URL = `search/movie?api_key=${API_KEY}`;
export const SEARCH_TV_URL = `search/tv?api_key=${API_KEY}`;
export const SEARCH_PERSON_URL = `search/person?api_key=${API_KEY}`;
export const SEARCH_MULTI_URL = `search/multi?api_key=${API_KEY}`;

export const GET_MOVIE_IMAGE_URL = (id: number) => BASE_URL + `movie/${id}/images?api_key=${API_KEY}`;
export const GET_TVSHOW_IMAGE_URL = (id: number) => BASE_URL + `tv/${id}/images?api_key=${API_KEY}`;
export const GET_ACTOR_IMAGE_URL = (id: number) => BASE_URL + `person/${id}/images?api_key=${API_KEY}`;


export const getDetailUrl = (id: number, mediaType: MediaType): string => {
    return `${mediaType}/${id}?&language=en-US&api_key=${API_KEY}`;
}
