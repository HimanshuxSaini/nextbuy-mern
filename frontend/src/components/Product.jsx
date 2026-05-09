import React, { useState } from 'react';
import { Button, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCurrency } from '../utils/addCurrency';
import { addToCart } from '../slices/cartSlice';
import Rating from './Rating';
import { toast } from 'react-toastify';
import { FaCartPlus } from 'react-icons/fa';

const Product = ({ product }) => {
  const [qty] = useState(1);
  const dispatch = useDispatch();

  const addToCartHandler = (e) => {
    e.preventDefault(); // Prevent navigating to product details when clicking Add To Cart
    dispatch(addToCart({ ...product, qty }));
    toast.success('Added to cart!');
  };

  return (
    <Card className='product-card my-3 h-100 position-relative'>
      {/* Optional Badge for visual flair */}
      {product.isNewProduct && (
        <Badge bg="danger" className="position-absolute top-0 start-0 m-3 z-1">
          NEW
        </Badge>
      )}

      <Link
        to={`/product/${product._id}`}
        style={{ textDecoration: 'none' }}
        className='text-dark d-flex flex-column h-100'
      >
        <div className='product-img-wrapper p-4 text-center'>
          <Card.Img
            variant='top'
            src={product.image}
            className='product-img'
          />
        </div>

        <Card.Body className='d-flex flex-column flex-grow-1 px-4 pb-4 pt-2'>
          <Card.Title as='div' className='product-title mb-2'>
            <strong>{product.name}</strong>
          </Card.Title>

          <Card.Text as='div' className='mb-auto'>
            <Rating
              value={product.rating}
              text={`(${product.numReviews} reviews)`}
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
  );
};

export default Product;
