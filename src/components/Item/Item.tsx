import React from 'react'
import { SMALL_IMAGE_SIZE } from '../../constants';
import { Link } from 'react-router-dom';
import { Multi } from '../../models/Multi';
import './style.css';

const Item = ({ result }: { result: Multi }) => {

    const title = result.mediaTitle;

    return (
        <Link className="navigate"
            to={{
                pathname: '/detail',
                state: { id: result.id, type: result.media_type }
            }}
        >
            <img
                alt={title}
                className="small-img-item"
                src={result.getImage(SMALL_IMAGE_SIZE)}
            />
            <div className="img-title">
                <span>{title}</span>
            </div>
        </Link>
    )
}

export default Item;