import React from 'react';
import Image from 'next/image';
import "./index.css";

export const FoodCategoryCards = ({ foodCategory, image }) => {
    return (
        <div className='category-cards-wrapper'>
            <Image src={image} alt={foodCategory} width={22} height={22} />
            <p>{foodCategory}</p>
        </div>
    );
}

