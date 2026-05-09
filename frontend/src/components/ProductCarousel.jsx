import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Row, Col, Button } from 'react-bootstrap';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import { addCurrency } from '../utils/addCurrency';
import Loader from './Loader';
import Message from './Message';
import { FaArrowRight } from 'react-icons/fa';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) return <Loader />;
  if (error) return <Message variant='danger'>{error?.data?.message || error.error}</Message>;

  return (
    <Carousel fade className='premium-carousel mb-5 z-0' indicators={true} controls={true}>
      {products?.map(product => (
        <Carousel.Item key={product._id} className="premium-carousel-item" interval={4000}>
          <div className="premium-carousel-bg-blur" style={{ backgroundImage: `url(${product.image})` }}></div>
          <ContainerFluidWrapper>
            <Row className='align-items-center h-100 px-lg-5 px-3 py-5 position-relative z-1'>
              {/* Product Info - Left Side */}
              <Col md={6} className='text-start text-white mb-4 mb-md-0 ps-lg-5 animate-fade-in'>
                <span className='badge bg-warning text-dark mb-3 px-3 py-2 font-weight-bold letter-spacing-1'>TOP RATED</span>
                <h1 className='carousel-product-name mb-3'>{product.name}</h1>
                <h2 className='carousel-product-price text-warning mb-4'>{addCurrency(product.price)}</h2>
                <Link to={`/product/${product._id}`}>
                  <Button variant='warning' size='lg' className='px-4 py-2 font-weight-bold d-flex align-items-center gap-2'>
                    Explore Product <FaArrowRight size={14} />
                  </Button>
                </Link>
              </Col>
              
              {/* Product Image - Right Side */}
              <Col md={6} className='text-center d-flex align-items-center justify-content-center h-100 animate-zoom-in'>
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className='carousel-product-image img-fluid'
                  />
                </Link>
              </Col>
            </Row>
          </ContainerFluidWrapper>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

// Simple helper component to avoid layout breaking
const ContainerFluidWrapper = ({ children }) => (
  <div className="container-fluid h-100" style={{ maxWidth: '1400px' }}>
    {children}
  </div>
);

export default ProductCarousel;
