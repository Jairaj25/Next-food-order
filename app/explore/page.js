"use client";
import locationIcon from "../../assets/location-pin.svg";
import Image from 'next/image';
import { FoodListCards } from "../components/food_cards/index";
import { FoodCategoryCards } from "../components/food_category_cards/index";
import { foodCategories } from "../../sample_data/foodcategories";
import { foods } from "../../sample_data/foods";
import "./index.css";

export default function ExplorePage() {
    const handleAddToCart = (item) => {
        // dispatch(addToCart(item));
        console.log('====================================');
        console.log("added to cart LOL");
        console.log('====================================');
    };
    return (
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
                            <input className="explore-banner-find-address-input" placeholder="Enter Delivery Address"></input>
                        </div>
                        <div className="explore-banner-find-address-button">Find</div>
                    </div>
                </div>
            </div>
            <div className="explore-food-category-wrapper">
                {foodCategories.map((category, index) => (
                    <FoodCategoryCards key={index} {...category} />
                ))}
            </div>
            <div className="explore-food-list-wrapper">
                {foods.map(product => (
                    <FoodListCards
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>
        </div>
    )
};