import React, { useEffect, useState } from 'react'
import './style.css'
import { Table, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { ADD } from '../redux/actions/Action';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import { borderRadius } from '@mui/system'


export default function CardDetails() {
  const dispatch = useDispatch();
  const [itemData, setItemData] = useState([]);
  const [indItemData, setIndItemData] = useState();
  const data = useSelector((state) => state.cartReducer.cart)
  const { id } = useParams();
  const [qty,setQty] = useState(1);
  console.log(qty)

  const getIdData = () => {
    let res = data.filter((e) => {
      return e.id == id
    });
    console.log("result", res)
    setItemData(res)
  }
  const apires = async () => {
    let apiresult = await axios.get(`https://fakestoreapi.com/products/${id}`)
    console.log("selected item", apiresult.data)
    setIndItemData(apiresult.data)
  }

  useEffect(() => {
    getIdData();
    apires();
  }, [id])

const dec=()=>{
  {
   if(qty>0){
    setQty(qty-1)
   }
  }

}

  const sendDatatoCart = (e) => {
    dispatch(ADD(e))
  }


  return (
    <>
      <div className='container mt-2'>
        <h2>Item Details</h2>
        <section className='container mt-3 sec_card'>
          <div className='itemdetails d-flex'>
            {
              indItemData ?
                <>
                  <div className='items_img m-5'>
                    <img src={indItemData.image} alt='Image' style={{ width: 300, height: 340, float: 'left', marginLeft: '50px', marginTop: '10px' }} />
                  </div>
                  <div className='details'>
                    <Table className='mt-5'>
                      <tr>
                        <td>
                          <p style={{ float: 'left' }}><b>Title</b> :{indItemData.title}</p>
                          <p style={{ float: 'left' }}><b>Description</b> : {indItemData.description}</p>
                          <p ><b>Rating</b> : <span style={{ backgroundColor: 'green', color: 'white', borderRadius: '5px', padding: 5 }}> {indItemData.rating.rate} ★</span></p>
                          <br />
                          <p style={{ float: 'left' }}><b>Price</b> : ₹{indItemData.price}</p>
                          <br />
                          <br />
                          <p className=' d-flex justify-content-between align-items-center' style={{ width: 100, cursor: 'pointer', backgroundColor: 'grey', borderRadius:'20px', float:'left' }}>
                            <span style={{fontSize:15}} onClick={()=>dec()}>-</span>
                            <span style={{fontSize:15}}>{qty}</span>
                            <span style={{fontSize:15}} onClick={()=>setQty(qty+1)}>+</span>
                          </p>
                          <br />
                        </td>
                      </tr>
                    </Table>
                    <p style={{ float: 'left' }}><b>Total</b> : ₹ {indItemData.price*qty}</p>
                    {/* <p><b style={{ float: 'left', marginLeft: 8 }}>Remove : <i className='fas fa-trash' style={{ color: 'red', cursor: 'pointer' }} /></b></p> */}

                    <NavLink to={`/`} >
                      <Button variant="primary" onClick={() => sendDatatoCart(indItemData)} style={{ marginBottom: 20 }}>Add to Cart</Button>
                    </NavLink>
                  </div>
                </>
                :
                null
            }
          </div>
        </section>

      </div>

    </>
  )
}


// rating:
// count: 120
// rate: 3.9