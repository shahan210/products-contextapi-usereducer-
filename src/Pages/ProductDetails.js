import React from 'react'
import { GrCart } from 'react-icons/gr'
import { Link } from 'react-router-dom'

export default function ProductDetails() {


    return (
        <>
             <nav className='navbar'>
                <Link  to="/">
                    <button className='nav-item2'>Add product</button>
                </Link>
            </nav>
            <div>
            <div className='cart'>
                <GrCart />
                <div className='cart-view'>{}</div>
            </div>
            </div>
            

        </>
    )
}
