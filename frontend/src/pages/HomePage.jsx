import React, { useEffect, useState } from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { FaTruck, FaShieldAlt, FaUndo, FaHeadset, FaFire } from 'react-icons/fa';

import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(0);
  const [skip, setSkip] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { search } = useSelector(state => state.search);

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const { data, isLoading, error } = useGetProductsQuery({
    limit,
    skip,
    search
  });

  useEffect(() => {
    if (data) {
      setLimit(16);
      setSkip((currentPage - 1) * limit);
      setTotal(data.total);
      setTotalPage(Math.ceil(total / limit));
    }
  }, [currentPage, data, limit, total, search]);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      // Smooth scroll to products section when categoryParam is detected from URL
      setTimeout(() => {
        const element = document.getElementById('products-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      setSelectedCategory('All');
    }
  }, [categoryParam]);

  const pageHandler = pageNum => {
    if (pageNum >= 1 && pageNum <= totalPage && pageNum !== currentPage) {
      setCurrentPage(pageNum);
    }
  };

  const handleCategoryClick = (category) => {
    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  // Extract unique categories dynamically from products
  const categories = data ? ['All', ...new Set(data.products.map(p => p.category))] : ['All'];

  // Filter products locally based on selected category pill
  const displayedProducts = data
    ? selectedCategory === 'All'
      ? data.products
      : data.products.filter(p => p.category === selectedCategory)
    : [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {!search && <ProductCarousel />}
          <Meta />

          {/* Premium Features Highlight Section */}
          {!search && (
            <Row className="my-5 text-center g-4">
              <Col xs={12} sm={6} lg={3}>
                <div className="p-4 bg-white rounded shadow-sm h-100 border-0 transition-all hover-translate-y">
                  <div className="text-warning mb-3 display-6"><FaTruck /></div>
                  <h5 className="font-weight-bold mb-2">Free Fast Delivery</h5>
                  <p className="text-muted small mb-0">Free shipping on all orders over ₹5,000</p>
                </div>
              </Col>
              <Col xs={12} sm={6} lg={3}>
                <div className="p-4 bg-white rounded shadow-sm h-100 border-0 transition-all hover-translate-y">
                  <div className="text-warning mb-3 display-6"><FaShieldAlt /></div>
                  <h5 className="font-weight-bold mb-2">Secure Purchases</h5>
                  <p className="text-muted small mb-0">Guaranteed safe payment & Cash on Delivery</p>
                </div>
              </Col>
              <Col xs={12} sm={6} lg={3}>
                <div className="p-4 bg-white rounded shadow-sm h-100 border-0 transition-all hover-translate-y">
                  <div className="text-warning mb-3 display-6"><FaUndo /></div>
                  <h5 className="font-weight-bold mb-2">Easy Replacements</h5>
                  <p className="text-muted small mb-0">Hassle-free 10-day replacement policy</p>
                </div>
              </Col>
              <Col xs={12} sm={6} lg={3}>
                <div className="p-4 bg-white rounded shadow-sm h-100 border-0 transition-all hover-translate-y">
                  <div className="text-warning mb-3 display-6"><FaHeadset /></div>
                  <h5 className="font-weight-bold mb-2">24/7 Premium Support</h5>
                  <p className="text-muted small mb-0">Dedicated support team always on standby</p>
                </div>
              </Col>
            </Row>
          )}

          {/* Dynamic Categories Selection Pills */}
          {!search && (
            <div className="mb-5 text-center">
              <h4 className="mb-3 font-weight-bold text-dark d-flex align-items-center justify-content-center">
                <FaFire className="text-warning me-2 animate-pulse" /> Browse By Category
              </h4>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {categories.map(category => (
                  <Badge
                    key={category}
                    bg={selectedCategory === category ? 'warning' : 'light'}
                    className={`px-4 py-2.5 rounded-pill font-weight-bold cursor-pointer text-dark shadow-sm border transition-all ${
                      selectedCategory === category ? 'scale-105 shadow' : 'opacity-75 hover-opacity-100'
                    }`}
                    style={{ fontSize: '0.9rem', cursor: 'pointer' }}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Grid Header */}
          <div id="products-section" className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
            <h2 className="font-weight-bold text-dark mb-0">
              {search ? `Search Results for "${search}"` : `${selectedCategory} Products`}
            </h2>
            <span className="text-muted font-weight-bold small">
              Showing {displayedProducts.length} items
            </span>
          </div>

          {displayedProducts.length === 0 ? (
            <Message variant="info">No products found in this category.</Message>
          ) : (
            <Row className="g-4">
              {displayedProducts.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          )}

          {totalPage > 1 && !search && selectedCategory === 'All' && (
            <Paginate
              currentPage={currentPage}
              totalPage={totalPage}
              pageHandler={pageHandler}
            />
          )}
        </>
      )}
    </>
  );
};

export default HomePage;
