import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Textbox from '../Components/Textbox'
import { useStateValue } from '../ContextAPI/GlobalState'
import { v4 as uuidv4 } from 'uuid';

export default function Page() {
    const [ {initialState} , dispatch] = useStateValue();
    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState('')
    const [url, setUrl] = useState('')
    const submitProduct = (e) => {
        e.preventDefault();
        let productDetails = [{
            product: productName,
            price: price,
            url: url,
            id: uuidv4()
        }]
        dispatch({ type: 'ADD_PRODUCTS', details: productDetails })
        let oldProducts = localStorage.getItem("product")
        if (oldProducts != null) {
            let oldProductParse = JSON.parse(oldProducts);
            let newArr = [...oldProductParse, productDetails[0]]
            localStorage.setItem('product', JSON.stringify(newArr));
            setProductName('')
            setPrice('')
            setUrl('')
        } else {
            localStorage.setItem('product', JSON.stringify(productDetails))
            setProductName('')
            setPrice('')
            setUrl('')
        }
    }
    return (
        <>
            <nav className='navbar'>
                <Link to="/product-details">
                    <button className='nav-item'>Products</button>
                </Link>
            </nav>
            <div>
                <form className='form-product'>
                    <Textbox type='text' placeholder='Product' value={productName || ""} onChange={(e) => setProductName(e.target.value)} />
                    <br></br><br></br>
                    <Textbox type='number' placeholder='Enter the price' value={price || ""} onChange={(e) => setPrice(e.target.value)} />
                    <br></br><br></br>
                    <Textbox type='text' placeholder='Url' value={url || ""} onChange={(e) => setUrl(e.target.value)} />
                    <br></br><br></br>
                    <button onClick={submitProduct} className='submit'>Submit</button>
                </form>
            </div>
        </>
    )
}
