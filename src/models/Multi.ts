
export abstract class Multi {

    protected constructor(public id: number, public media_type: string, public popularity: number) { }

    abstract get mediaTitle(): string;
    abstract get castUrl(): string;
    abstract getImage(size: string): string;
    abstract get description(): string;

} 