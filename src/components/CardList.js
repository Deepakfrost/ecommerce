import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import "./style.css";
import { ADD } from '../redux/actions/Action';
import { NavLink } from 'react-router-dom';

export default function CardList() {
    const [qty,setQty] = useState(1);
    const dispatch=useDispatch();
    const sendDatatoCart = (e) =>{
        dispatch(ADD(e))
    }
    const [data, setData] = useState([])
    const fetchData = async () => {
        const res = await axios.get("https://fakestoreapi.com/products")
            .catch((err) => { alert(err.message) })
       // console.log(res.data)
        setData(res.data)

    }
    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className='container mt-3'>
            
            <div className='row d-flex justify-content-center aligh-items-center '>
                {
                    data ?
                        data.map((ele, id) => {
                            return (
                                <React.Fragment  key={id} >
                                
                                    <Card style={{ width: '22rem', }} className='mx-2 mt-4 card-style' >
                                        <Card.Img variant="top" src={ele.image} alt="Loading...." style={{ height: '18rem' }} className='mt-3' />
                                        <Card.Body style={{ float: 'left' }} className='cardbody'>
                                        <Card.Title>{ele.title}</Card.Title>
                                        </Card.Body>
                                        <div style={{marginBottom:20,marginTop:20}}>
                                                <Card.Text style={{ float: 'left',marginLeft:20 }} >
                                                   <b>Prince : {ele.price*qty}</b> 
                                                </Card.Text>
                                        </div>
                                        <NavLink to={`details/${ele.id}`} >
                                        <Button variant="primary" 
                                        
                                        style={{ marginBottom:20  }}>View</Button>
                                        </NavLink>
                                        
                                    </Card>
                                    
                                </React.Fragment>
                            )
                        })
                        :<h3>Loading.......</h3>
                }

            </div>

        </div>
    )
}
