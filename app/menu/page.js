"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoods } from '../redux/action/product-actions';
import { foodCategories } from "../../sample_data/foodcategories";
import { MenuProductsList } from "../components/menu_product_list/index";
import bannerImage from "../../assets/menu-banner-image.jpeg";
import "./index.css";


export default function Menu() {

    const [activeIndex, setActiveIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState('');

    const foods = useSelector((state) => state.foods.foods);
    const dispatch = useDispatch();

    const handleCategoryClick = (index, selectedCategory) => {
        if (typeof index === 'string') {
            const correctIndex = foodCategories.slice(1, -1).map( item => item.foodCategory).indexOf(index);
            setActiveIndex(correctIndex);
        } else {
            setActiveIndex(index);
        }
        setActiveCategory(selectedCategory);
    };

    useEffect(() => {
        dispatch(fetchFoods());
      }, [dispatch]);

    return (
        <div className='main-menu-container'>
            <div className='menu-banner'>
                <Image src={bannerImage} alt="banner Image" width={1650} height={350} />
            </div>
            <div className='menu-header'>
                <div className='menu-header-title'>Our Menu</div>
                <div className='menu-header-additional-info'>
                    <div className='menu-header-location'>Navrangpura, Ahmedabad</div>
                    <div className='menu-header-timings'>
                        <span className='menu-header-open-indicator'>Open now</span>
                        <span> - </span>
                        <span> 11am &ndash; 3:30pm, 7pm &ndash; 11pm (Today)</span>
                    </div>
                </div>
            </div>
            <div className='menu-container'>
                <div className='menu-category-container'>
                    {foodCategories.slice(1, -1).map((category, index) => (
                        <div
                            key={index}
                            className={`menu-category-list ${index === activeIndex ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(index, category.foodCategory)}
                        >
                            {category.foodCategory}
                        </div>
                    ))}
                </div>
                <div className='menu-food-list-container'>
                    <MenuProductsList products={foods} activeCategory={activeCategory} handleActiveCategoryChange={handleCategoryClick} />
                </div>
            </div>
        </div>
    )
}
