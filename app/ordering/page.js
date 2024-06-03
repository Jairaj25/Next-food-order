'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/reducer/cart-reducer';
import { useSearchParams } from 'next/navigation'

export default function Ordering() {
    const searchParams = useSearchParams();
   
    const orderCheck = searchParams.get('order');

    const dispatch = useDispatch();
    
    useEffect(() => {
        if(orderCheck === 'true'){
            dispatch(clearCart());
        }
    }, [orderCheck]);

}