import React, { useEffect , useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Menu from '@mui/material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './style.css'
import { Table } from 'react-bootstrap';
import { DLT } from '../redux/actions/Action';

export default function Header() {
    const data = useSelector((state) => state.cartReducer.cart)
    const [qty,setQty] = useState(1);
    const [price,setPrice]=useState(0)
    const dispatch=useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
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
    const dec=()=>{
    {
        if(qty>0){
        setQty(qty-1)
        }
    }
    
    }

    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container>
                <NavLink to="/" className="text-decoration-none mx-3" style={{ color: "white" }}>D's Store</NavLink>
                <Nav className="me-auto">
                    <NavLink to="/" className="text-decoration-none" style={{ color: "white" }}>Home</NavLink>
                </Nav>
                <Badge badgeContent={data.length} color="primary"
                    id="demo-positioned-button"
                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    style={{ marginTop: 5 }} >
                    <ShoppingCartIcon fontSize='large' style={{ color: "white", height: "60px", cursor: 'pointer' }} />
                </Badge>
            </Container>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {
                    data.length ?
                        <div className='card_details' style={{ padding: 10, width: '25rem' }}>
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
                                                <>
                                                <tr>
                                                    <td>
                                                        <NavLink to={`details/${e.id}`} onClick={handleClose}>
                                                        <img src={e.image} alt="image" style={{width:100,height:100,cursor:'pointer'}} />
                                                        </NavLink>
                                                       
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
                                                {/* <tr>
                                                <p className=' d-flex justify-content-between align-items-center' style={{ width: 100, cursor: 'pointer', backgroundColor: 'grey', borderRadius:'0px', float:'left',marginTop:'10px' }}>
                                                            <span style={{fontSize:15}} onClick={()=>dec()}>-</span>
                                                            <span style={{fontSize:15}}>{qty}</span>
                                                            <span style={{fontSize:15}} onClick={()=>setQty(qty+1)}>+</span>
                                                        </p>

                                                </tr> */}
                                                </>
                                            )
                                        })
                                    }
                                </tbody>
                                
                                <p className='text-center'  style={{ float:'left'}}>Total : ₹ {price}</p>
                                <NavLink to="/billing" className="text-decoration-none mx-3" onClick={handleClose}>
                                <p style={{alignItems:'center' , justifyContent:'center',marginLeft:150,marginTop:50,borderRadius:'10ox' }}>
                                    <button style={{borderRadius:10,backgroundColor:'blue',width:100,color:'white'}}>Buy</button>
                                    </p>
                                    </NavLink>
                            </Table>

                        </div>
                        :
                        <div className='cardDetails' style={{ padding: 10, width: '20rem' }}>
                            <i className=' fas  fa-close small' style={{ position: "absolute", top: 2, right: 5, cursor: 'pointer', marginBottom: '20px' }} onClick={handleClose}></i>
                            <p><b>Your Cart is Empty</b></p>
                        </div>
                }

            </Menu>
        </Navbar>
    )
}
