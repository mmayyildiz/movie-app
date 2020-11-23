import React, { useEffect, useRef, useState } from 'react'
import { LARGE_IMAGE_SIZE, MEDIUM_IMAGE_SIZE } from '../../constants/sizeConstants';
import TMDBService from '../../services/TMDBService';
import ItemList from '../ItemList/ItemList';
import { Multi } from '../../models/Multi';
import './style.css';
import { Media } from '../../models/Media';
import { MediaType } from '../../models/MediaType';

interface DetailProps {
    location: {
        state: {
            id: number;
            type: MediaType;
        }
    }
}

const Detail = ({ location }: DetailProps) => {

    const [detail, setDetail] = useState<Multi>();
    const [cast, setCast] = useState<Array<Multi>>([]);

    useEffect(() => {
        if (location.state) {
            const { id, type } = location.state;
            (async () => {
                const detail = await TMDBService.getInstance().getDetail(id, type);
                const cast = await TMDBService.getInstance().getCast(detail);
                console.log('DETAIL ', detail);
                setDetail(detail);
                setCast(cast);
            })();
        }

    }, [location]);

    let startYear;
    let voteAverage;
    let castTitle;
    let descriptionTitle;
    let backgroundImg = '';
    let posterImg = '';

    if (detail) {
        backgroundImg = detail.getImage(LARGE_IMAGE_SIZE);
        posterImg = detail.getImage(MEDIUM_IMAGE_SIZE);
        castTitle = 'Known For';
        descriptionTitle = 'Biography'
        if (detail instanceof Media) {
            startYear = detail.startDate.substr(0, 4);
            voteAverage = detail.vote_average;
            castTitle = 'Cast Members';
            descriptionTitle = 'Overview';
        }
    }


    return (

        detail ?
            <React.Fragment>
                <div className="detail-header" style={{ backgroundImage: `url(${backgroundImg})` }}>
                    <div className="custom-bg">
                        <div className="detail-container">
                            <div className="img-container">
                                <img className="detail-img" src={posterImg} />
                            </div>
                            <div className="details-container">
                                <div>
                                    <h1>
                                        {detail.mediaTitle} {startYear && `(${startYear})`}
                                        {voteAverage &&
                                            <>
                                                <span className="rating">
                                                    {voteAverage}
                                                    <span className="small-text">/ 10 </span>
                                                </span>
                                                <img className="star-img" src="/images/star.png" />
                                            </>
                                        }
                                    </h1>
                                </div>
                                {detail.description &&
                                    <div className="description">
                                        <h2>{descriptionTitle}</h2>
                                        <p>{detail.description}</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {cast.length > 0 &&
                    <div>
                        <h1 className="cast-title"> {castTitle} </h1>
                        <ItemList results={cast} />
                    </div>
                }
            </React.Fragment >
            : <div></div>
    )
}

export default Detail;
