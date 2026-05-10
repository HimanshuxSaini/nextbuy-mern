import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col, Card, Form, Button, Accordion } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { FaFilter, FaStar, FaSortAmountDown, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

import Product from '../components/Product';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import Rating from '../components/Rating';

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  
  // Filter states
  const [category, setCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState('createdAt');

  const { search } = useSelector(state => state.search);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  // Sync initial category from URL if present
  useEffect(() => {
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [categoryParam]);

  const limit = 12;
  const skip = (currentPage - 1) * limit;

  const { data, isLoading, error, isFetching } = useGetProductsQuery({
    limit,
    skip,
    search,
    category,
    minPrice: Number(minPrice) || 0,
    maxPrice: Number(maxPrice) || undefined,
    rating,
    sort
  });

  useEffect(() => {
    if (data) {
      setTotalPage(Math.ceil(data.total / limit));
    }
  }, [data, limit]);

  // Reset to page 1 whenever any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, minPrice, maxPrice, rating, sort]);

  const pageHandler = pageNum => {
    if (pageNum >= 1 && pageNum <= totalPage && pageNum !== currentPage) {
      setCurrentPage(pageNum);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Fixed categories list for consistency, or dynamically generated if you have an all-products-endpoint
  const categories = ['All', 'Electronics', 'Gadgets', 'Fashion', 'Accessories', 'Home Decor', 'Smartphones', 'Computers'];

  const resetFilters = () => {
    setCategory('All');
    setMinPrice('');
    setMaxPrice('');
    setRating(0);
    setSort('createdAt');
    setSearchParams({});
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Meta />
      {!search && currentPage === 1 && !categoryParam && (
        <div className="mb-5">
          <ProductCarousel />
        </div>
      )}

      <Row className="g-4">
        {/* Sidebar Filter Component */}
        <Col lg={3} md={4} className="d-none d-md-block">
          <div className="sticky-top" style={{ top: '120px', zIndex: 1 }}>
            <Card className="filter-card p-3">
              <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                <h5 className="filter-header d-flex align-items-center mb-0">
                  <FaFilter className="text-warning me-2" size={16} />
                  Filters
                </h5>
                <button onClick={resetFilters} className="clear-btn">Clear All</button>
              </div>

              <Accordion defaultActiveKey={['0', '1', '2']} alwaysOpen flush className="filter-accordion">
                <Accordion.Item eventKey="0" className="border-0 mb-3">
                  <Accordion.Header className="px-0"><span className="filter-title mb-0">Category</span></Accordion.Header>
                  <Accordion.Body className="px-0 pt-2 pb-0">
                    <div className="d-flex flex-column gap-1">
                      {categories.map((cat) => (
                        <div
                          key={cat}
                          className={`filter-option ${category === cat ? 'active' : ''}`}
                          onClick={() => setCategory(cat)}
                        >
                          {cat}
                          {category === cat && <FaArrowRight size={10} />}
                        </div>
                      ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1" className="border-0 mb-3">
                  <Accordion.Header className="px-0"><span className="filter-title mb-0">Price Range</span></Accordion.Header>
                  <Accordion.Body className="px-0 pt-2 pb-0">
                    <div className="range-inputs mt-1">
                      <Form.Control
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                      <div className="align-self-center text-muted">-</div>
                      <Form.Control
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                    </div>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2" className="border-0 mb-2">
                  <Accordion.Header className="px-0"><span className="filter-title mb-0">Customer Rating</span></Accordion.Header>
                  <Accordion.Body className="px-0 pt-2 pb-0">
                    {[4, 3, 2, 1].map((star) => (
                      <div
                        key={star}
                        className={`rating-filter-row d-flex align-items-center justify-content-between rounded ${rating === star ? 'bg-light font-weight-bold' : ''}`}
                        onClick={() => setRating(star)}
                        style={{ cursor: 'pointer', padding: '8px' }}
                      >
                        <div className="d-flex align-items-center">
                           <Rating value={star} text="" />
                           <span className="ms-2 small">& Up</span>
                        </div>
                        <Form.Check 
                          type="radio"
                          checked={rating === star}
                          onChange={() => {}}
                          name="rating-radio"
                        />
                      </div>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card>
          </div>
        </Col>

        {/* Main Content Area */}
        <Col lg={9} md={8}>
          {/* Header Controls Row */}
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 bg-white p-3 rounded shadow-sm">
            <div>
              <h4 className="font-weight-bold text-dark mb-1">
                {search ? `Results for "${search}"` : category === 'All' ? 'Latest Collection' : category}
              </h4>
              <span className="text-muted small font-weight-bold">
                Showing {data?.products?.length || 0} of {data?.total || 0} items
              </span>
            </div>

            <div className="d-flex align-items-center gap-2 mt-2 mt-sm-0">
              <FaSortAmountDown className="text-muted d-none d-sm-block" />
              <Form.Select 
                className="premium-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                style={{ width: 'auto' }}
              >
                <option value="createdAt">Newest Arrivals</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="ratingDesc">Top Rated</option>
              </Form.Select>
            </div>
          </div>

          {error ? (
            <Message variant="danger">{error?.data?.message || error.error}</Message>
          ) : isLoading || isFetching ? (
            <Row className="g-4">
              {[...Array(8)].map((_, idx) => (
                <Col key={idx} xs={12} sm={6} lg={4} xl={4}>
                   <ProductCardSkeleton />
                </Col>
              ))}
            </Row>
          ) : data?.products?.length === 0 ? (
            <Card className="border-0 text-center p-5 shadow-sm rounded-20">
               <Card.Body>
                 <div className="display-4 text-muted mb-3">🔍</div>
                 <h3>No products found</h3>
                 <p className="text-muted">We couldn't find any match for the current filter criteria. Try clearing them.</p>
                 <Button variant="warning" className="mt-2" onClick={resetFilters}>Clear Filters</Button>
               </Card.Body>
            </Card>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <Row className="g-4">
                <AnimatePresence>
                  {data.products.map((product) => (
                    <Col key={product._id} xs={12} sm={6} lg={4} xl={4}>
                      <motion.div variants={itemVariants} layout>
                        <Product product={product} />
                      </motion.div>
                    </Col>
                  ))}
                </AnimatePresence>
              </Row>
            </motion.div>
          )}

          {totalPage > 1 && !isLoading && !isFetching && (
            <div className="mt-5 d-flex justify-content-center">
              <Paginate
                currentPage={currentPage}
                totalPage={totalPage}
                pageHandler={pageHandler}
              />
            </div>
          )}
        </Col>
      </Row>
    </motion.div>
  );
};

export default HomePage;

