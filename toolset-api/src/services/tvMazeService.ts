import { AxiosStatic } from 'axios';
import { injectable, inject } from 'inversify';
import { INJECTABLES, TvMazeTvShowListItem, TvMazeTvShowDetails, TvMazeActorListItem, TvMazeActorDetails } from '@/models/types/types';

@injectable()
export default class TvMazeService {
    constructor(@inject(INJECTABLES.axios) private axios: AxiosStatic) { }

    public async searchTvShows(name: string): Promise<TvMazeTvShowListItem[]> {
        return (await this.axios.get(`http://api.tvmaze.com/search/shows?q=${name}`)).data;
    }

    public async tvShowDetails(showId: number): Promise<TvMazeTvShowDetails> {
        return (await this.axios.get(`http://api.tvmaze.com/shows/${showId}?embed=cast`)).data
    }

    public async searchActors(name: string): Promise<TvMazeActorListItem[]> {
        return (await this.axios.get(`http://api.tvmaze.com/search/people?q=${name}`)).data;
    }

    public async actorDetails(actorId: number): Promise<TvMazeActorDetails> {
        return (await this.axios.get(`http://api.tvmaze.com/people/${actorId}`)).data;
    }
}
