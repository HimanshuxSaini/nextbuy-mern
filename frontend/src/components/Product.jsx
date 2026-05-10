import React, { useState } from 'react';
import { Button, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCurrency } from '../utils/addCurrency';
import { addToCart } from '../slices/cartSlice';
import Rating from './Rating';
import { toast } from 'react-toastify';
import { FaCartPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Product = ({ product }) => {
  const [qty] = useState(1);
  const dispatch = useDispatch();

  const addToCartHandler = (e) => {
    e.preventDefault(); 
    dispatch(addToCart({ ...product, qty }));
    toast.success('Added to cart!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -5 }}
      className="h-100"
    >
      <Card className='product-card my-3 h-100 position-relative'>
        {product.countInStock === 0 && (
          <Badge bg="secondary" className="position-absolute top-0 start-0 m-3 z-1">
            OUT OF STOCK
          </Badge>
        )}

        <Link
          to={`/product/${product._id}`}
          style={{ textDecoration: 'none' }}
          className='text-dark d-flex flex-column h-100'
        >
          <div className='product-img-wrapper p-4 text-center'>
            <motion.img
              src={product.image}
              className='product-img'
              alt={product.name}
              loading="lazy"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </div>

          <Card.Body className='d-flex flex-column flex-grow-1 px-4 pb-4 pt-2'>
            <Card.Title as='div' className='product-title mb-2'>
              <strong>{product.name}</strong>
            </Card.Title>

            <Card.Text as='div' className='mb-auto'>
              <Rating
                value={product.rating}
                text={`(${product.numReviews})`}
              />
            </Card.Text>

            <div className='d-flex align-items-end justify-content-between mt-4'>
              <Card.Text as='h3' className='product-price-tag mb-0'>
                {addCurrency(product.price)}
              </Card.Text>
              
              <Button
                variant='warning'
                className='product-action-btn'
                disabled={product.countInStock === 0}
                onClick={addToCartHandler}
              >
                {product.countInStock === 0 ? 'Out of Stock' : <><FaCartPlus className="me-2" /> Add</>}
              </Button>
            </div>
          </Card.Body>
        </Link>
      </Card>
    </motion.div>
  );
};

export default Product;

