import React, { PureComponent, createRef } from 'react'
import TMDBService from '../../services/TMDBService';
import SearchResponse from '../../models/SearchResponse';
import { Multi } from '../../models/Multi';
import './style.css';
import ItemList from '../ItemList/ItemList';
import Search from '../Search/Search';
import { MediaType } from '../../models/MediaType';

interface DashboardProps {
    match: {
        params: {
            initialSearchKey: string
        }
    }
}

interface DashboardState {
    result: SearchResponse<Multi>;
    searchKey: string;
    searchOption: string;
    loading: boolean;
    prevY: number;
}

class Dashboard extends PureComponent<DashboardProps, DashboardState> {

    constructor(props: DashboardProps) {
        super(props);
        const { initialSearchKey } = props.match.params;
        this.state = {
            result: { page: 1, total_pages: 1, results: [] },
            searchKey: initialSearchKey,
            searchOption: 'all',
            loading: false,
            prevY: 0
        };
    }

    private loadingRef = createRef<HTMLDivElement>();
    observer?: IntersectionObserver;

    fetchData = async (page: number) => {
        console.log('fetchdata');
        this.setState({ loading: true });

        let data: SearchResponse<Multi>;

        switch (this.state.searchOption) {
            case MediaType.MOVIE:
                data = await TMDBService.getInstance().fetchMovies(this.state.searchKey, page);
                break;
            case MediaType.TV:
                data = await TMDBService.getInstance().fetchTvShows(this.state.searchKey, page);
                break;
            case MediaType.PERSON:
                data = await TMDBService.getInstance().fetchActors(this.state.searchKey, page);
                break;
            default:
                data = await TMDBService.getInstance().fetchAll(this.state.searchKey, page);
        }

        if (page === 1) {
            this.setState({ result: data });
        } else {
            this.setState(prevState => ({
                result: {
                    page: data.page,
                    total_pages: data.total_pages,
                    results: [...prevState.result.results, ...data.results]
                }
            }));
        }

        this.setState({ loading: false });

    };

    loadMore = () => {
        const { result } = this.state;
        if (result.page < result.total_pages) {
            this.fetchData(result.page + 1);
        }
    };


    componentDidMount() {
        console.log('componentDidMount');
        this.fetchData(1);

        // Create an observer
        this.observer = new IntersectionObserver(
            entries => {
                const firstEntry = entries[0];
                const y = firstEntry.boundingClientRect.y;

                if (this.state.prevY > y) {
                    setTimeout(() => { this.loadMore(); }, 1000);
                }

                this.setState({ prevY: y });
            },
            { threshold: 1 }
        );

        //Observ the `loadingRef`
        if (this.loadingRef) {
            this.observer.observe(this.loadingRef.current!);
        }
    }

    componentDidUpdate(_prevProps: DashboardProps, prevState: DashboardState) {
        console.log('componentDidUpdate');
        if (prevState.searchKey !== this.state.searchKey || prevState.searchOption !== this.state.searchOption) {
            this.fetchData(1);
        }
    }

    search = (key: string, option: string) => {
        if (key.trim().length > 0 && this.state.searchKey !== key.trim()) {
            this.setState({ searchKey: key });
        }
        if (this.state.searchOption !== option) {
            this.setState({ searchOption: option });
        }
    }

    render() {

        const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

        const { results } = this.state.result;

        return (
            <div className="dashboard-container">
                <Search onClick={this.search} />
                { (results.length) > 0 && <ItemList results={results} />}
                <div className="loading"
                    ref={this.loadingRef as React.RefObject<HTMLDivElement>}
                >
                    <span style={loadingTextCSS}>Loading...</span>
                </div>
            </div>
        )
    }
}

export default Dashboard;