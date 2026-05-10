import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const ProductCardSkeleton = () => {
  return (
    <Card className='product-card my-3 h-100' style={{ border: 'none' }}>
      <div className='product-img-wrapper p-4 text-center' style={{ height: '220px' }}>
         <div className="skeleton-box w-75 h-75" style={{ borderRadius: '12px' }}></div>
      </div>
      <Card.Body className='d-flex flex-column px-4 pb-4 pt-2'>
        <div className="skeleton-box mb-2" style={{ height: '20px', width: '80%' }}></div>
        <div className="skeleton-box mb-3" style={{ height: '15px', width: '40%' }}></div>
        <div className='d-flex align-items-center justify-content-between mt-auto pt-3'>
          <div className="skeleton-box" style={{ height: '28px', width: '60px' }}></div>
          <div className="skeleton-box" style={{ height: '36px', width: '80px', borderRadius: '10px' }}></div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCardSkeleton;
