import { Media } from "./Media";

export default class Movie extends Media {

    constructor(data: Partial<Movie>) {
        super(data);
        this.adult = data.adult!;
        this.release_date = data.release_date!;
        this.original_title = data.original_title!;
        this.title = data.title!;
        this.video = data.video!;
    }

    get mediaTitle(): string {
        return this.title;
    }

    get startDate() {
        return this.release_date;
    }

    adult: boolean;
    release_date: string;
    original_title: string;
    title: string;
    video: boolean;
}









/*
"popularity": 36.686,
"vote_count": 2325,
"video": false,
"poster_path": "/48G2U0zmBh8mQ7gv8scC9xYIZSk.jpg",
"id": 19994,
"adult": false,
"backdrop_path": "/aTmh5w201d86lt3juFk8tbK297Y.jpg",
"original_language": "en",
"original_title": "Jennifer's Body",
"genre_ids": [
    35,
    27
],
"title": "Jennifer's Body",
"vote_average": 5.6,
"overview": "Jennifer, a gorgeous, seductive cheerleader who takes evil to a whole new level after she's possessed by a sinister demon. Now it's up to her best friend to stop Jennifer's reign of terror before it's too late.",
"release_date": "2009-09-18"
*/