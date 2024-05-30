"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity } from '../../redux/reducer/cart-reducer';
import Rating from '@mui/material/Rating';
import Image from 'next/image';
import placeholder from '../../../assets/bolognese-spaghetti.jpeg';
import "./index.css";

export const FoodListCards = ({ product, onAddToCart }) => {
    const { id, foodName, image, foodPrice, restaurant, category, rating } = product;
    const [addedToCart, setAddedToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    useEffect(() => {
        const itemInCart = cartItems?.find(item => item.id === id);
        if (itemInCart) {
            setAddedToCart(true);
            setQuantity(itemInCart.quantity);
        }
    }, [cartItems, id]);

    const handleAddToCart = () => {
        const cartItem = {
            id: product.id,
            foodName,
            price: foodPrice,
            image: image,
            quantity: 1,
            category,
            restaurant,
            rating
        };
        onAddToCart(cartItem);
        setAddedToCart(true);
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
            dispatch(updateQuantity({ itemId: id, increment: false }));
        } else if (quantity === 1) {
            setQuantity(0);
            dispatch(updateQuantity({ itemId: id, increment: false }));
            setAddedToCart(false);
        }
    };

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
        dispatch(updateQuantity({ itemId: id, increment: true }));
    };

    return (
        <div className='food-list-wrapper'>
            <div className='food-list-grid-wrapper'>
                <div className='food-list-image'>
                    <Image className="inner-img" src={placeholder} alt={foodName} />
                </div>
                <div className='food-list-name-action-wrapper'>
                    <div className='food-list-name'>
                        <p>{foodName}</p>
                    </div>
                    <div className="food-list-add-to-cart-button">
                        {addedToCart ?
                            (<div className="quantity-buttons">
                                <button onClick={handleDecreaseQuantity}>-</button>
                                <span>{quantity}</span>
                                <button onClick={handleIncreaseQuantity}>+</button>
                            </div>)
                            :
                            (<button onClick={handleAddToCart}>Add to Cart</button>)
                        }
                    </div>
                </div>
                <div className='food-list-price'>
                    <p>${foodPrice}</p>
                    <p className='food-list-price-additional-text'>
                        <span className='food-list-separator'></span> {restaurant} <span className='food-list-separator'></span> {category[0]}
                    </p>
                    <span className='food-list-separator'></span>
                    <div className="food-list-rating-container">
                        <p>{rating}</p>
                        <Rating name="read-only" precision={0.5} value={parseInt(rating)} readOnly size="small" />
                    </div>
                </div>
            </div>

        </div>
    );
}

