"use client";
import locationIcon from "../../assets/location-pin.svg";
import Image from 'next/image';
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { FoodListCards } from "../components/food_cards/index";
import { FoodCategoryCards } from "../components/food_category_cards/index";
import { foodCategories } from "../../sample_data/foodcategories";
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoods } from '../redux/action/product-actions';
import { addToCart } from '../redux/reducer/cart-reducer';
import "./index.css";

export default function ExplorePage() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const dispatch = useDispatch();
    const foods = useSelector((state) => state.foods.foods);
    const popularProduct = foods.slice(0, 15);

    useEffect(() => {
        dispatch(fetchFoods());
    }, [dispatch]);


    useEffect(() => {
        setFilteredProducts(foods)
    }, [foods]);

    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
    };

    useEffect(() => {
        let tempFilteredProducts = [];
        if (selectedCategory === null || selectedCategory === "All") {
            tempFilteredProducts = popularProduct;
        } else {
            tempFilteredProducts = foods.filter((item) =>
                item.category
                    .map((cat) => cat.toLowerCase())
                    .includes(selectedCategory.toLowerCase()));
        }
        setFilteredProducts(tempFilteredProducts);

    }, [selectedCategory, foods]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);

    };

    return (
        <>
            <div className="explore-main-container">
                <div className="explore-main-banner">
                    <div className="explore-banner-content">
                        <div className="explore-banner-order-text-container">
                            <p>Order with</p>
                            <div className="explore-banner-order-text-logo"></div>
                        </div>
                        <p> We provide super-fast delivery or pick-up </p>
                        <div className="explore-banner-input-container">
                            <div className="explore-banner-input-wrapper">
                                <Image className="explore-banner-location-pin" src={locationIcon} alt="Location Pin" height={18} width={18} />
                                <input id="banner-address" className="explore-banner-find-address-input" name="address" autoComplete="off" placeholder="Enter Delivery Address"></input>
                            </div>
                            <button className="explore-banner-find-address-button">Find</button>
                        </div>
                    </div>
                </div>
                <div className="explore-food-category-wrapper">
                    {foodCategories.map((category, index) => (
                        <FoodCategoryCards key={index} {...category} handleCategoryFilter={() => handleCategorySelect(category.foodCategory)} />
                    ))}
                </div>
                {selectedCategory === "All" || selectedCategory === null ?
                    (<div className="explore-food-list-title">
                        <div>Popular Dishes</div>
                        <Link href="/menu">View All &gt;</Link>
                    </div>) :
                    (<div className="explore-food-list-title">
                        <div>{selectedCategory} Dishes</div>
                        <Link href="/menu">View All &gt;</Link>
                    </div>)}

                <div className="explore-food-list-wrapper">
                    {filteredProducts.map(product => (
                        <FoodListCards
                            key={product.id}
                            product={product}
                            onAddToCart={handleAddToCart}
                        />
                    ))}
                </div>
                <div className="explore-user-list-container">
                    <div className="link-to-mock-api-container">
                        <h3><Link href="/users">Click to perform CRUD Operations</Link></h3>
                    </div>
                </div>
            </div>
        </>
    )
};