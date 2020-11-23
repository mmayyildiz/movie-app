import { isGetAccessor } from "typescript";
import { API_KEY } from "../constants";
import { Media } from "./Media";
import { MediaType } from "./MediaType";
import { Multi } from "./Multi";

export default class Person extends Multi {

    constructor(data: Partial<Person>) {
        super(data.id!, data.media_type!, data.popularity!);
        this.name = data.name!;
        this.known_for = data.known_for!;
        this.profile_path = data.profile_path!;
        this.adult = data.adult!;
        this.biography = data.biography!;
    }

    get mediaTitle(): string {
        return this.name;
    }

    getImage(size: string) {
        if (this.profile_path === null) {
            return '/images/image-not-found.png'
        }
        return `https://image.tmdb.org/t/p/${size}${this.profile_path}`;
    }

    get castUrl() {
        return `${MediaType.PERSON}/${this.id}/combined_credits?api_key=${API_KEY}&language=en-US`;
    }

    get description() {
        return this.biography;
    }

    name: string;
    known_for: Media[];
    profile_path: string;
    adult: boolean;
    biography: string;
}