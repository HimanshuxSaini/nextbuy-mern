import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import {
  Row,
  Col,
  Card,
  ListGroup,
  Form,
  Image,
  Button,
  ListGroupItem
} from 'react-bootstrap';
import { motion } from 'framer-motion';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import Meta from '../components/Meta';
import { addCurrency } from '../utils/addCurrency';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async id => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='py-4'
    >
      <Meta title={'Shopping Cart'} />
      
      {cartItems.length === 0 ? (
        <div className='text-center my-5 py-5 empty-cart-container'>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className='empty-cart-icon-wrapper mx-auto mb-4'
          >
            <FaShoppingCart size={60} className='text-secondary' />
          </motion.div>
          <h2 className='fw-bold text-dark mb-3'>Your cart is feeling lonely</h2>
          <p className='text-muted mb-4 pb-2' style={{ fontSize: '1.1rem' }}>
            Explore our best deals and fill your cart with tech delights!
          </p>
          <Link to='/'>
            <Button variant='warning' className='px-4 py-2 rounded-pill btn-add-cart-large fw-bold shadow-sm'>
              Start Shopping Now
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <h1 className='mb-4 d-flex align-items-center gap-2'>
            <FaShoppingCart className='text-warning' />
            Shopping Cart
          </h1>
          <Row className='gy-4'>
            <Col md={8}>
              <ListGroup variant='flush' className='shadow-sm rounded-3 bg-white overflow-hidden'>
                {cartItems.map(item => (
                  <ListGroup.Item className='p-4 border-bottom border-light' key={item._id}>
                    <Row className='align-items-center text-center text-md-start'>
                      <Col md={2} className='mb-3 mb-md-0'>
                        <div className='rounded border overflow-hidden shadow-sm' style={{ background: '#f8f9fa' }}>
                          <Image src={item.image} alt={item.name} fluid />
                        </div>
                      </Col>
                      <Col md={3} className='mb-3 mb-md-0'>
                        <Link
                          to={`/product/${item._id}`}
                          className='product-title text-dark fw-bold h6 text-decoration-none hover-link'
                        >
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={3} className='fw-bold text-warning h5 mb-3 mb-md-0'>
                        {addCurrency(item.price)}
                      </Col>
                      <Col md={2} xs={8} className='mb-3 mb-md-0'>
                        <Form.Control
                          as='select'
                          value={item.qty}
                          onChange={e =>
                            addToCartHandler(item, Number(e.target.value))
                          }
                          className='premium-select border shadow-none py-2 px-3'
                        >
                          {[...Array(item.countInStock).keys()].map(x => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={2} xs={4} className='text-end text-md-center'>
                        <Button
                          type='button'
                          variant='light'
                          className='border-0 text-danger delete-cart-btn p-3 bg-transparent rounded-circle'
                          onClick={() => removeFromCartHandler(item._id)}
                        >
                          <FaTrash size={18} />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className='mt-4'>
                <Link to='/' className='text-muted text-decoration-none d-inline-flex align-items-center gap-2 fw-medium hover-warning transition-all'>
                   <FaArrowLeft size={12} /> Continue Shopping
                </Link>
              </div>
            </Col>

            <Col md={4}>
              <Card className='border-0 shadow-sm rounded-4 overflow-hidden bg-white'>
                <div className='bg-dark text-white p-4'>
                  <h4 className='mb-0 fw-bold'>Order Summary</h4>
                </div>
                <ListGroup variant='flush'>
                  <ListGroup.Item className='p-4 border-0'>
                    <div className='d-flex justify-content-between mb-3 text-muted'>
                      <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                    </div>
                    <div className='d-flex justify-content-between align-items-end'>
                      <h3 className='mb-0 fw-bold text-dark'>
                        {addCurrency(
                          cartItems.reduce(
                            (acc, item) => acc + item.qty * item.price,
                            0
                          )
                        )}
                      </h3>
                    </div>
                  </ListGroup.Item>
                  <ListGroupItem className='p-4 pt-0 border-0'>
                    <Button
                      className='w-100 py-3 fw-bold rounded-pill btn-add-cart-large shadow border-0'
                      variant='warning'
                      type='button'
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Proceed To Checkout
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </motion.div>
  );
};

export default CartPage;
