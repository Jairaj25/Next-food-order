"use client";
import { useSearchParams, redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/reducer/cart-reducer';
import { searchProducts } from '../redux/action/product-actions';
import { FoodListCards } from "../components/food_cards/index";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./index.css";

export default function SearchPage() {

    const [age, setAge] = useState('');
    const [activeFilters, setActiveFilters] = useState([]);
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const miscFilters = [{ id: 1, filterTitle: 'Rating: 3.5+' }, { id: 2, filterTitle: 'Price: < $10' }];
    const products = useSelector(state => state.products);
    const searchQuery = searchParams.get('query');

    if (searchQuery === null || searchQuery === '') {
        redirect('/');
    }

    useEffect(() => {
        dispatch(searchProducts(searchQuery));
    }, [dispatch, searchQuery]);

    if (products.length === 0) {
        return (
            <div className='search-container'>
                <div>No matching results for &quot;{searchQuery}&quot;</div>
            </div>
        )
    }

    const handleRatingFilterClick = (itemId) => {
      setActiveFilters((prevActiveFilters) =>
        prevActiveFilters.includes(itemId)
          ? prevActiveFilters.filter((id) => id !== itemId)
          : [...prevActiveFilters, itemId]
      );
    };

    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
    };

    const handleSortChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div className='search-container'>
            <div className='search-title'>Search Results for &quot;{searchQuery}&quot;: </div>
            <div className='search-filter-container'>
                <div className='search-sort-filter-container'>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                            <Select
                                variant="outlined"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Sort"
                                onChange={handleSortChange}
                                sx={{
                                    fontSize: '14px',
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'green'
                                    },
                                }}
                            >
                                <MenuItem sx={{ fontSize: 14 }} value={"asc"}>Price (Low to High)</MenuItem>
                                <MenuItem sx={{ fontSize: 14 }} value={"desc"}>Price (High to Low)</MenuItem>
                                <MenuItem sx={{ fontSize: 14 }} value={"ratingDesc"}>Rating (High to Low)</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div className='search-sort-misc-filter-separator'></div>
                <div className='search-misc-filter-container'>
                    {miscFilters.map((item) => (
                        <div
                            key={item.id}
                            className={`search-rating-filter misc-filter-border 
                                ${activeFilters.includes(item.id) ? 'filter-focus' : ''}`}
                            onClick={() => handleRatingFilterClick(item.id)}
                        >
                            <p>{item.filterTitle}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="search-list-wrapper">
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