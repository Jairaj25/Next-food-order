"use client";
import locationIcon from "../../assets/location-pin.svg";
import Image from 'next/image';
import { useEffect } from "react";
import { FoodListCards } from "../components/food_cards/index";
import { FoodCategoryCards } from "../components/food_category_cards/index";
import { foodCategories } from "../../sample_data/foodcategories";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/action/product-actions';
import { addToCart } from '../redux/reducer/cart-reducer';
// import { fetchUsers } from '../redux/action/mock-api-action';
// import { updateCurrentPage } from "../redux/reducer/mock-api-reducer";
import "./index.css";

export default function ExplorePage() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    // const { loading, users, error, currentPage, usersPerPage } = useSelector((state) => state.mockApi);

    // const temp = useSelector((state) => state.mockApi);
    // console.log(temp);

    useEffect(() => {
        dispatch(fetchProducts());
        // dispatch(fetchUsers());
    }, [dispatch]);

    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
        console.log('====================================');
        console.log("added to cart LOL");
        console.log('====================================');
    };

    // const indexOfLastUser = currentPage * usersPerPage;
    // const indexOfFirstUser = indexOfLastUser - usersPerPage;
    // const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    // const totalUsers = users.length;
    // const lastPage = (totalUsers / usersPerPage).toFixed(0);

    // const paginate = (pageNumber) => {
    //     if (pageNumber >= 1 && pageNumber <= Math.ceil(totalUsers / usersPerPage)) {
    //         dispatch(updateCurrentPage(pageNumber));
    //     }
    // };
    // const renderUserRange = () => {
    //     const indexOfLastUser = currentPage * usersPerPage;
    //     const indexOfFirstUser = indexOfLastUser - usersPerPage;
    //     const upperBound = Math.min(indexOfLastUser, totalUsers);
    //     const lowerBound = Math.min(indexOfFirstUser + 1, totalUsers);

    //     return `Showing ${lowerBound}-${upperBound} out of ${totalUsers}`;
    // };

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
                {products.map(product => (
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