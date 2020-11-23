import { API_KEY } from "../constants";
import { Multi } from "./Multi";

export abstract class Media extends Multi {

    protected constructor(data: Partial<Media>) {
        super(data.id!, data.media_type!, data.popularity!);
        this.poster_path = data.poster_path!;
        this.overview = data.overview!;
        this.backdrop_path = data.backdrop_path!;
        this.vote_average = data.vote_average!;
        this.genre_ids = data.genre_ids!;
        this.original_language = data.original_language!;
        this.vote_count = data.vote_count!;
    }

    get castUrl() {
        return `${this.media_type}/${this.id}/credits?api_key=${API_KEY}&language=en-US`;
    }

    getImage(size: string) {
        if (this.poster_path === null) {
            return '/images/image-not-found.png'
        }
        return `https://image.tmdb.org/t/p/${size}${this.poster_path}`;
    }


    get description() {
        return this.overview;
    }

    abstract get startDate(): string;

    poster_path: string;
    overview: string;
    backdrop_path: string;
    vote_average: number;
    genre_ids: number;
    original_language: string;
    vote_count: number;
}