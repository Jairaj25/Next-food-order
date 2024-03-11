"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../redux/reducer/cart-reducer';
import Image from 'next/image';
import "./index.css";

export const FoodListCards = ({ product, onAddToCart }) => {
    const { id, foodName, image, foodPrice, restaurant, category } = product;
    const [addedToCart, setAddedToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    useEffect(() => {
        const itemInCart = cartItems.find(item => item.id === id);
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
            dispatch(removeFromCart(id));
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
                    <Image className="inner-img" src={image} alt={foodName} />
                </div>
                <div className='food-list-name-action-wrapper'>
                    <div className='food-list-name'>
                        <p>{foodName}</p>
                    </div>
                </div>
                <div className='food-list-price'>
                    <p>${foodPrice}</p> <p className='food-list-price-additional-text'> <span></span> {restaurant} <span></span> {category[0]}</p>
                </div>
            </div>
            <div className="food-list-add-to-cart-button">
                {addedToCart ?
                    (<div className="quantity-buttons">
                        <button onClick={handleDecreaseQuantity}>-</button>
                        <span>{quantity}</span>
                        <button onClick={handleIncreaseQuantity}>+</button>
                    </div>)
                    :
                    (<p onClick={handleAddToCart}>Add to Cart</p>)
                }
            </div>
        </div>
    );
}

