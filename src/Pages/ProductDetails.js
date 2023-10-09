import React from 'react'
import { GrCart } from 'react-icons/gr'
import { Link } from 'react-router-dom'

export default function ProductDetails() {


    return (
        <>
             <nav className='navbar'>
                <Link  to="/product-details">
                    <button className='nav-item2'>Add product</button>
                </Link>
            </nav>
            <div>
            <div className='cart'>
                <GrCart />
                <div className='cart-view'>{}</div>
            </div>
            </div>
            <table className='table-product'>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th style={{fontSize:20}}><GrCart /></th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>

                    </tr>
                </tbody>
            </table>

        </>
    )
}
