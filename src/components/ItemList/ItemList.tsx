import React from 'react'
import { Multi } from '../../models/Multi';
import Item from '../Item/Item';
import './style.css';

const ItemList = ({ results }: { results: Array<Multi> }) => {

    return (

        <div className="flex-container">
            {results.map((result, index) =>
                <div key={index}>
                    <Item result={result} />
                </div>
            )}
        </div>

    )
}

export default ItemList;
