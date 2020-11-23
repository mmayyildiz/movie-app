import { Media } from "./Media";

export default class Tv extends Media {

    constructor(data: Partial<Tv>) {
        super(data);
        this.first_air_date = data.first_air_date!;
        this.origin_country = data.origin_country!;
        this.name = data.name!;
        this.original_name = data.original_name!;
    }

    get mediaTitle(): string {
        return this.name;
    }

    get startDate() {
        return this.first_air_date;
    }

    first_air_date: string;
    origin_country: string[];
    name: string;
    original_name: string;
}


