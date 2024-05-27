import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { foodCategories } from "../../../sample_data/foodcategories";
import { FoodListCards } from '../food_cards';
import { addToCart } from '../../redux/reducer/cart-reducer';
import "./index.css";

export function MenuProductsList({ products, activeCategory, handleActiveCategoryChange }) {

    const dispatch = useDispatch();
    const categoryRefs = useRef({});

    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
    };

    useEffect(() => {

        if (categoryRefs.current[activeCategory]) {
            categoryRefs.current[activeCategory].scrollIntoView({ behavior: 'instant'});
        }

    }, [activeCategory]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.18,
        };

        const callback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    handleActiveCategoryChange(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);

        Object.values(categoryRefs.current).forEach((ref) => {
            observer.observe(ref);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className="product-list-container">
            {foodCategories.slice(1, -1).map(category => {
                const ref = (element) => {
                    if (element) {
                        categoryRefs.current[category.foodCategory] = element;
                    }
                };
                return (

                    <div key={category.foodCategory} id={category.foodCategory} ref={ref} className="product-list-sorted">
                    <div className="product-list-title">{category.foodCategory}</div>
                        <div className='list-upper-border'></div>
                        <div className="product-list">
                            {products
                                .filter(food => food.category.includes(category.foodCategory))
                                .map(product => (
                                    <FoodListCards
                                        key={product.id}
                                        product={product}
                                        onAddToCart={handleAddToCart}
                                    />
                                ))}
                        </div>
                        <div className="end-of-list-bottom-border"></div>
                    </div>
                )
            })
            }
        </div >
    );
}