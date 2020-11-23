import { API_KEY } from "../constants";
import { MediaType } from "../models/MediaType";

export const getDetailUrl = (id: number, mediaType: MediaType): string => {
    return `${mediaType}/${id}?&language=en-US&api_key=${API_KEY}`;
}