import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Textbox, Buttons } from '../Components/Index'
import { useStateValue } from '../ContextAPI/GlobalState'
import { v4 as uuidv4 } from 'uuid';
// import { Buttons } from '../Components/Index'

export default function Page() {
    const [{ product }, dispatch] = useStateValue();
    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState('')
    const [url, setUrl] = useState('')
    const [editProduct, setEdit] = useState('')
    const [editId, setEditId] = useState(null);

    const submitProduct = async (e) => {
        e.preventDefault();
        let productDetails = {
            product: productName,
            price: price,
            url: url,
            id: uuidv4()
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
                    <Textbox type='text' placeholder='Product' value={productName || ""} onChange={(e) => setProductName(e.target.value)} />
                    <br></br><br></br>
                    <Textbox type='number' placeholder='Enter the price' value={price || ""} onChange={(e) => setPrice(e.target.value)} />
                    <br></br><br></br>
                    <Textbox type='text' placeholder='Url' value={url || ""} onChange={(e) => setUrl(e.target.value)} />
                    <br></br><br></br>
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
