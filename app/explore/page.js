"use client";
import locationIcon from "../../assets/location-pin.svg";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { FoodListCards } from "../components/food_cards/index";
import { FoodCategoryCards } from "../components/food_category_cards/index";
import { foodCategories } from "../../sample_data/foodcategories";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/action/product-actions';
import { addToCart } from '../redux/reducer/cart-reducer';
import { fetchUsers } from '../redux/action/mock-api-action';
import { updateCurrentPage } from "../redux/reducer/mock-api-reducer";
import "./index.css";

export default function ExplorePage() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const { loading, users, error, currentPage, usersPerPage } = useSelector((state) => state.mockApi);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        setFilteredProducts(products)
    }, [products]);

    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
    };

    useEffect(() => {
        let tempFilteredProducts = [];
        if (selectedCategory === null || selectedCategory === "All") {
            tempFilteredProducts = products;
        } else {
            tempFilteredProducts = products.filter(product => product.category.includes(selectedCategory));
        }
        setFilteredProducts(tempFilteredProducts);

    }, [selectedCategory, products]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);

    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalUsers = users.length;
    const lastPage = (totalUsers / usersPerPage).toFixed(0);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= Math.ceil(totalUsers / usersPerPage)) {
            dispatch(updateCurrentPage(pageNumber));
        }
    };
    const renderUserRange = () => {
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        const upperBound = Math.min(indexOfLastUser, totalUsers);
        const lowerBound = Math.min(indexOfFirstUser + 1, totalUsers);

        return `Showing ${lowerBound}-${upperBound} out of ${totalUsers}`;
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
                            <input id="banner-address" className="explore-banner-find-address-input" name="address" autoComplete="off" placeholder="Enter Delivery Address"></input>
                        </div>
                        <div className="explore-banner-find-address-button">Find</div>
                    </div>
                </div>
            </div>
            <div className="explore-food-category-wrapper">
                {foodCategories.map((category, index) => (
                    <FoodCategoryCards key={index} {...category} handleCategoryFilter={() => handleCategorySelect(category.foodCategory)} />
                ))}
            </div>
            {selectedCategory === "All" || selectedCategory === null? 
            (<div className="explore-food-list-title"><p>Popular Dishes</p></div>) : 
            (<div className="explore-food-list-title"><p>{selectedCategory} Dishes</p></div>)}
            
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
                <div>
                    <h2>Mock Api Data</h2>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <>
                        <div className='alignself-baseline'><p>{renderUserRange()}</p></div>
                        <div className="explore-user-list-wrapper">
                            {currentUsers.map((user) => (
                                <div className="explore-user-list-cards" key={user.id}>
                                    <div className="user-list-image">
                                        <Image src={user.avatar} alt={user.name} width={300} height={304.5} />
                                    </div>
                                    <div className="user-list-text">
                                        <div className="user-list-name-desc">
                                            <div className="user-list-name">
                                                <p>{user.name}</p>
                                            </div>
                                            <div className="user-list-description">
                                                <p>{user.description.length > 70 ? `${user.description.substring(0, 50)}...` : user.description}</p>
                                            </div>
                                        </div>
                                        <div className="user-list-vehicle">
                                            <p>{user.vehicle}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="explore-users-pagination-wrapper">
                            <button className={currentPage === 1 ? ("disable-btn") : ("")} onClick={() => paginate(1)}><a href="#test">&lt;&lt;</a></button>
                            <button className={currentPage === 1 ? ("disable-btn") : ("")} onClick={() => paginate(currentPage - 1)}><a href="#test">&lt;&nbsp;&nbsp;Previous</a></button>
                            <div className='pagination-current-page'><p>{currentPage}</p></div>
                            <button className={currentPage.toString() === lastPage ? ("disable-btn") : ("")} onClick={() => paginate(currentPage + 1)}><a href="#test">Next&nbsp;&nbsp;&gt;</a></button>
                            <button className={currentPage.toString() === lastPage ? ("disable-btn") : ("")} onClick={() => paginate(lastPage)}><a href="#test">&gt;&gt;</a></button>
                        </div>
                    </>
                )}
                <div className="link-to-mock-api-container">
                    <h3><Link href="/users">Click to perform CRUD Operations</Link></h3>
                </div>
            </div>
        </div>
    )
};