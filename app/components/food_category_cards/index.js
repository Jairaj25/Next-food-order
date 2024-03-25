import React from 'react';
import Image from 'next/image';
import "./index.css";

export const FoodCategoryCards = ({ foodCategory, image, handleCategoryFilter }) => {
    const handleClick = () => {
        handleCategoryFilter(foodCategory);
    };
    return (
        <button className='category-cards-wrapper' onClick={handleClick}>
            <Image src={image} alt={foodCategory} width={22} height={22} />
            <span>{foodCategory}</span>
        </button>
    );
}

