import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Textbox, Buttons } from '../Components/Index'
import { useStateValue } from '../ContextAPI/GlobalState'
import { v4 as uuidv4 } from 'uuid';
import {AiFillExclamationCircle} from 'react-icons/ai'

export default function Page() {
    const [{ product }, dispatch] = useStateValue();
    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState('')
    const [url, setUrl] = useState('')
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});

    const submitProduct = async (e) => {
        e.preventDefault();
        let productDetails = {
            product: productName,
            price: price,
            url: url,
            id: uuidv4()
        }
        const validationErrors = {}
        setErrors(validationErrors)
        if (productName == "") {
            validationErrors.productName = "Enter a Product Name "
        }
        if(price == 0 && price == "") {
            validationErrors.price = "Enter an amount"
        }
         if(url == "") {
            validationErrors.url = "Enter an url"
            return
        }
        await dispatch({ type: 'ADD_PRODUCT', payload: productDetails })
        setPrice('')
        setProductName('')
        setUrl('')
    }
    const edit = (id) => {
        const value = product.map((itm) => itm)
        const getValue = value.filter(itm => itm.id === id)
        setProductName(getValue[0].product)
        setPrice(getValue[0].price)
        setUrl(getValue[0].url)
        setEditId(getValue[0].id)
    }
    const updateProduct = (e) => {
        e.preventDefault();
        const getValue = product.forEach((element) => {
            if (element.id === editId) {
                element.product = productName
                element.price = price
                element.url = url
            }
        })
        dispatch({ type: 'EDIT_PRODUCT', payload: product })
        setPrice('')
        setProductName('')
        setUrl('')
        setEditId(null)
    }

    const deleteRow = (id) => {
        dispatch({ type: "DELETE_PRODUCT", payload: id });
    }
    return (
        <>
            <nav className='navbar'>
                <Link to="/product-details">
                    <Buttons name='Products' className='nav-item' />
                </Link>
            </nav>
            <div style={{ position: 'relative' }}>
                <form className='form-product'>
                    
                    <div>
                        <Textbox type='text' placeholder='Product' value={productName || ""} onChange={(e) => setProductName(e.target.value)} />
                        {errors.productName && <p style={{ fontFamily:"'pinPops', sans-serif", fontSize: 12, color: 'red' }}><AiFillExclamationCircle/> {errors.productName}</p>}
                    </div>
                    <div>
                        <Textbox type='number' placeholder='Enter the price' value={price || ""} onChange={(e) => setPrice(e.target.value)} />
                        {errors.price && <p style={{ fontFamily:"'pinPops', sans-serif", fontSize: 12, color: 'red' }}><AiFillExclamationCircle/> {errors.price}</p>}

                    </div>
                    <div>
                        <Textbox type='text' placeholder='Url' value={url || ""} onChange={(e) => setUrl(e.target.value)} />
                        {errors.url && <p style={{ fontFamily:"'pinPops', sans-serif", fontSize: 12, color: 'red' }}><AiFillExclamationCircle/> {errors.url}</p>}

                    </div>

                    <Buttons onClick={editId === null ? submitProduct : updateProduct} name={editId === null ? "Submit" : "Update"} className='submit' />
                </form>
                <table className='table-product'>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Url</th>
                            <th>Edit / Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            product !== null && product !== undefined && product.length > 0 && product.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                            <span>{item.product}</span>
                                        </td>
                                        <td><span>{item.price}</span> </td>
                                        <td className='ellipsis1' >
                                            <span className='ellipsis ' >{item.url}</span>
                                        </td>
                                        <td>
                                            <Buttons onClick={() => edit(item.id)} className='edit-button' name="Edit" />
                                            <Buttons onClick={() => deleteRow(item.id)} name="Delete" className='delete-button ' />
                                        </td>
                                    </tr>
                                )
                            }
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
