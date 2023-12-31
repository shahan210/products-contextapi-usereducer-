import { GrCart } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import { useStateValue } from '../ContextAPI/GlobalState'
import {  Buttons } from '../Components/Index'
import {RxCross2} from 'react-icons/rx'


export default function ProductDetails() {
    const [{ product, cart }, dispatch] = useStateValue()
   
    const cartAdding = (id) => {
        const getCartvalues = product.find(itm => itm.id === id)
        console.log(getCartvalues);
        console.log(cart);
        if (getCartvalues !== cart) {
             dispatch({ type: 'ADD_TO_CART', payload: getCartvalues })
        } else {
           dispatch({ type: "DELETE_FROM_CART", payload: id })
        }
    }
    const opennav = () => {
        document.getElementById("trans").style.display = "block";
        document.getElementById("change").style.display = "none";
        document.getElementById("cross").style.display = "block";
        document.getElementById("hideAll").style.display = "none";
    }
    const closenav = () => {
        document.getElementById("trans").style.display = "none";
        document.getElementById("change").style.display = "block";
        document.getElementById("cross").style.display = "none";
        document.getElementById("hideAll").style.display = "block";
    }
    const deleteFromCart = (id) => {
        dispatch({ type: "DELETE_FROM_CART", payload: id })

    }
    return (
        <>
            <nav className='navbar'>
                <Link to="/">
                    <button className='nav-item2'>Add product</button>
                </Link>
            </nav>
            <div>
                <div>
                    <button id='change' onClick={opennav} className='cart'><GrCart /></button>
                    <button id='cross' onClick={closenav} className='cart'><RxCross2/></button>
                    <div id='trans'>
                        <div className='align adjust'>
                            {
                                cart !== null && cart !== undefined && cart.length > 0 && cart.map((item, i) => {
                                    return (
                                        <div key={i}>
                                            <div className='card'>
                                                <div className='cont'>
                                                    <img src={item.url} alt='' className='image-card ' />
                                                    <Buttons  onClick={() => deleteFromCart(item.id)} className='add-cross' name={'-'} />
                                                </div>
                                                <div className='containor'>
                                                    <div>{item.product}</div>
                                                    <div>&#8377; {item.price}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div id='hideAll'>
                <div className='align adjust'>
                    {
                        product !== null && product !== undefined && product.length > 0 && product.map((item, i) => {
                            return (
                                <div key={i}>
                                    <div className='card'>
                                        <div className='cont'>
                                            <img src={item.url} alt='' className='image-card' />
                                            <Buttons id='drop' onClick={() => cartAdding(item.id)} className='add-cart' name={'+'} />
                                        </div>
                                        <div className='containor'>
                                            <div>{item.product}</div>
                                            <div>&#8377; {item.price}</div>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}