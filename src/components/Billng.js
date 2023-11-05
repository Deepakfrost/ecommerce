import React,{useState,useEffect}from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { DLT } from '../redux/actions/Action';
import Form from 'react-bootstrap/Form';
import './style.css'
export default function Billng() {
    const data = useSelector((state) => state.cartReducer.cart)
    const [price,setPrice]=useState(0)
    const dispatch=useDispatch()
    const dlt=(id)=>{
        dispatch(DLT(id))
    }
    const total=()=>{
        let sum=0;
        data.map((ele,k)=>{
            sum=ele.price+sum
        })
        setPrice(sum)
    }
    useEffect(() => {
        total()
      }, [total])
    return (
        <div className='billing'>
            <div className='left'>
                <h3>Shipping Address</h3>
                <Form className='form'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" className="mb-3" placeholder=" Street" />
                        <Form.Control type="email" className="mb-3" placeholder=" Area" />
                        <Form.Control type="email" className="mb-3" placeholder=" City" />
                        <Form.Control type="email" className="mb-3" placeholder=" State" />
                    </Form.Group>
                </Form>

            </div>
            <div className='right'>
                {
                    data.length ?
                        <div className='card_details' style={{ padding: 10, width: '50rem' }}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((e) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <img src={e.image} alt="image" style={{ width: 100, height: 100, cursor: 'pointer' }} />
                                                    </td>
                                                    <td>
                                                        <p>Title : {e.title}</p>
                                                        <p>Price : ₹ {e.price}</p>
                                                        <p onClick={()=>dlt(e.id)}>Remove : <i className='fas fa-trash smalltrash' style={{color:'red', cursor:'pointer'}}/></p>
                                                    </td>
                                                    {/* <td className='mt-5' style={{color:'red', cursor:'pointer'}}>
                                                    <i className='fas fa-trash' />
                                                    </td> */}
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                                <p className='text-center'>Total : ₹ {price}</p>

                            </Table>
                            <p style={{justifyContent: 'center', marginLeft:1, marginTop:'10%', borderRadius: '10px' }}>
                <Button style={{ borderRadius: 10, width: 100, color: 'white' }}> Confirm</Button>
            </p>
                        </div> :
                        null
                }
            </div>
            
        </div>
    )
}
