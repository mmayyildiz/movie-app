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