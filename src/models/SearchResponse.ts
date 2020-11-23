export default interface SearchResponse<T> {
    page: number;
    total_pages: number;
    results: T[];
}