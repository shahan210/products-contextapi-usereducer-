import React, { useEffect, useState } from 'react'
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

    
    const submitProduct = async (e) => {
        e.preventDefault();
        let productDetails = [{
            product: productName,
            price: price,
            url: url,
            id: uuidv4()
        }]
        await dispatch({ type: 'ADD_PRODUCT', payload: productDetails })
        setPrice('')
        setProductName('')
        setUrl('')
    }
    const edit = (id) => {
        const getEditvalues = product.map((itm)=>itm[0])
        const value =  getEditvalues.map((itm)=>itm)
        const getValue = value.filter(itm=> itm.id===id)
        setEdit(getValue)
        setProductName(getValue[0].product)
        setPrice(getValue[0].price)
        setUrl(getValue[0].url)
    }
    const updateProduct = ()=>{
        dispatch({ type: 'EDIT_PRODUCT', payload: product })

    }

    const deleteRow = (id)=>{
        dispatch({
            type: "DELETE_PRODUCT",
            payload: id
          });
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
                    <button onClick={submitProduct} className='submit'>Submit</button>
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
                                return (item.map((itm, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{itm.product}</td>
                                            <td>{itm.price}</td>
                                            <td>{itm.url}</td>
                                            <td>
                                                <Buttons onClick={() => edit(itm.id)} className='edit-button' name="Edit" />
                                                <Buttons onClick={() => deleteRow(itm.id)} name="Delete" className='delete-button ' />
                                            </td>
                                        </tr>
                                    )
                                }))
                            }
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
