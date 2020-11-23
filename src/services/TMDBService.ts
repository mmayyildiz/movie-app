import axios, { AxiosInstance } from 'axios';
import {
    BASE_URL,
    SEARCH_MOVIE_URL,
    SEARCH_MULTI_URL,
    SEARCH_PERSON_URL,
    SEARCH_TV_URL
} from '../constants';
import Person from '../models/Person';
import Movie from '../models/Movie';
import { Multi } from '../models/Multi';
import SearchResponse from '../models/SearchResponse';
import Tv from '../models/Tv';
import { MediaType } from '../models/MediaType';
import _ from 'lodash';
import { Media } from '../models/Media';
import { getDetailUrl } from '../utils';

export default class TMDBService {

    private static instance: TMDBService;
    private readonly axiosInstance: AxiosInstance;

    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: BASE_URL,
            responseType: 'json',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    static getInstance(): TMDBService {
        if (!TMDBService.instance) {
            TMDBService.instance = new TMDBService();
        }

        return TMDBService.instance;
    }

    async fetchMovies(searchKey: string, page: number): Promise<SearchResponse<Movie>> {
        let movies: SearchResponse<Movie> = { page: 0, total_pages: 0, results: [] };

        try {
            const response = await this.axiosInstance.get<SearchResponse<Movie>>(
                SEARCH_MOVIE_URL + `&language=en-US&query=${searchKey}&page=${page}`);

            const data: SearchResponse<Movie> = response.data;
            const results = data.results.map(result => new Movie({ ...result, media_type: MediaType.MOVIE }))

            movies = { page: data.page, total_pages: data.total_pages, results };

        } catch (error) {
            console.log('fetchMovies - ERROR : ' + error);
        }

        return movies;
    }

    async fetchTvShows(searchKey: string, page: number): Promise<SearchResponse<Tv>> {
        let shows: SearchResponse<Tv> = { page: 0, total_pages: 0, results: [] };

        try {
            const response = await this.axiosInstance.get<SearchResponse<Tv>>(
                SEARCH_TV_URL + `&language=en-US&query=${searchKey}&page=${page}`);

            const data: SearchResponse<Tv> = response.data;
            const results = data.results.map(result => new Tv({ ...result, media_type: MediaType.TV }))
            shows = { page: data.page, total_pages: data.total_pages, results };

        } catch (error) {
            console.log('fetchTvShows - ERROR : ' + error);
        }

        return shows;
    }


    async fetchActors(searchKey: string, page: number): Promise<SearchResponse<Person>> {
        let actors: SearchResponse<Person> = { page: 0, total_pages: 0, results: [] };

        try {
            const response = await this.axiosInstance.get<SearchResponse<Person>>(
                SEARCH_PERSON_URL + `&language=en-US&query=${searchKey}&page=${page}`);

            const data: SearchResponse<Person> = response.data;
            const results: Person[] = data.results.map(result => new Person({ ...result, media_type: MediaType.PERSON }));

            actors = { page: data.page, total_pages: data.total_pages, results }

        } catch (error) {
            console.log('fetchActors - ERROR : ' + error);
        }

        return actors;
    }


    async fetchAll(searchKey: string, page: number): Promise<SearchResponse<Multi>> {
        let searchResult: SearchResponse<Multi> = { page: 0, total_pages: 0, results: [] };

        try {
            const response = await this.axiosInstance.get<SearchResponse<Multi>>(
                SEARCH_MULTI_URL + `&language=en-US&query=${searchKey}&page=${page}`);

            const data: SearchResponse<Multi> = response.data;
            const results: Multi[] = _.compact(data.results.map(result => {
                switch (result.media_type) {
                    case MediaType.MOVIE:
                        return new Movie(result);
                    case MediaType.TV:
                        return new Tv(result);
                    case MediaType.PERSON:
                        return new Person(result);
                    default:
                        return undefined;
                }
            }));
            searchResult = { page: data.page, total_pages: data.total_pages, results }

        } catch (error) {
            console.log('fetchAll - ERROR : ' + error);
        }

        return searchResult;
    }


    async getCast(item: Multi): Promise<Array<Multi>> {

        let cast: Array<Multi> = [];
        try {
            const response = await this.axiosInstance.get(item.castUrl);

            if (item instanceof Media) {
                cast = response.data.cast.map((data: Partial<Person>) => new Person({ ...data, media_type: MediaType.PERSON }))
            } else {
                cast = _.compact(response.data.cast.map((data: Partial<Media>) => {
                    switch (data.media_type) {
                        case MediaType.MOVIE:
                            return new Movie(data);
                        case MediaType.TV:
                            return new Tv(data);
                        default:
                            return undefined;
                    }
                }))
            }
        } catch (error) {
            console.log('getCast - ERROR : ' + error);
        }

        return cast;
    }


    async getDetail(id: number, type: MediaType): Promise<Multi | undefined> {

        let detail: Multi | undefined;
        try {
            const url = getDetailUrl(id, type);
            const response = await this.axiosInstance.get(url);

            switch (type) {
                case MediaType.MOVIE:
                    detail = new Movie({ ...response.data, media_type: MediaType.MOVIE });
                    break;
                case MediaType.TV:
                    detail = new Tv({ ...response.data, media_type: MediaType.TV });
                    break;
                case MediaType.PERSON:
                    detail = new Person({ ...response.data, media_type: MediaType.PERSON });
                    break;
            }
        } catch (error) {
            console.log('getDetail - ERROR : ' + error);
        }
        return detail;
    }

}