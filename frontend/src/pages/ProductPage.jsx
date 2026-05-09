import React, { useState } from 'react';
import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  Card,
  Form,
  ListGroupItem
} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetProductDetailsQuery,
  useCreateProductReviewMutation
} from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { toast } from 'react-toastify';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addCurrency } from '../utils/addCurrency';
import Reviews from '../components/Reviews';
import { FaArrowLeft, FaShoppingCart, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ProductPage = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { userInfo } = useSelector(state => state.auth);

  const {
    data: product,
    isLoading,
    error
  } = useGetProductDetailsQuery(productId);

  const [createProductReview, { isLoading: isCreateProductReviewLoading }] =
    useCreateProductReviewMutation();

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success('Product added to cart!');
  };

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const res = await createProductReview({
        productId,
        rating,
        comment
      });
      if (res.error) {
        toast.error(res.error?.data?.message);
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }

    setRating(0);
    setComment('');
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="product-details-page-wrapper animate-fade-in">
          <Link to='/' className='btn btn-dark btn-back-custom my-4 px-3 py-2 d-inline-flex align-items-center gap-2'>
            <FaArrowLeft /> Go Back
          </Link>
          <Meta title={product.name} description={product.description} />
          <Row className="gy-4">
            {/* Product Image Section */}
            <Col lg={5} md={6}>
              <div className="product-details-img-container p-4 text-center">
                <Image src={product.image} alt={product.name} fluid className="product-details-img" />
              </div>
              <Row className='review d-none d-md-block mt-4'>
                <Col>
                  <Reviews
                    product={product}
                    userInfo={userInfo}
                    rating={rating}
                    laoding={isCreateProductReviewLoading}
                    setRating={setRating}
                    comment={comment}
                    setComment={setComment}
                    submitHandler={submitHandler}
                  />
                </Col>
              </Row>
            </Col>

            {/* Product Details info */}
            <Col lg={4} md={6}>
              <div className="product-details-info-box">
                <h1 className="product-details-title mb-3">{product.name}</h1>
                
                <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} ratings`}
                  />
                </div>

                <div className="product-details-price-box mb-4">
                  <span className="price-label">Price:</span>
                  <span className="price-value text-warning ms-2">{addCurrency(product.price)}</span>
                </div>

                <div className="product-details-description">
                  <h5 className="font-weight-bold text-dark mb-2">About this item:</h5>
                  <p className="lead-text text-muted">{product.description}</p>
                </div>
              </div>
            </Col>

            {/* Checkout Widget Card */}
            <Col lg={3} md={12}>
              <Card className="checkout-widget-card border-0 shadow-sm p-4">
                <ListGroup variant='flush' className="bg-transparent">
                  <ListGroup.Item className="bg-transparent px-0 pt-0 d-flex justify-content-between align-items-center pb-3">
                    <span className="text-muted">Price</span>
                    <span className="font-weight-bold h4 mb-0 text-dark">{addCurrency(product.price)}</span>
                  </ListGroup.Item>
                  
                  <ListGroup.Item className="bg-transparent px-0 d-flex justify-content-between align-items-center py-3">
                    <span className="text-muted">Status</span>
                    <span>
                      {product.countInStock > 0 ? (
                        <span className="badge bg-success-light text-success d-inline-flex align-items-center gap-1">
                          <FaCheckCircle /> In Stock
                        </span>
                      ) : (
                        <span className="badge bg-danger-light text-danger d-inline-flex align-items-center gap-1">
                          <FaTimesCircle /> Out Of Stock
                        </span>
                      )}
                    </span>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item className="bg-transparent px-0 py-3 d-flex justify-content-between align-items-center">
                      <span className="text-muted">Quantity</span>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={e => setQty(Number(e.target.value))}
                        className="qty-selector-select"
                        style={{ width: '80px' }}
                      >
                        {Array.from(
                          { length: product.countInStock },
                          (_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          )
                        )}
                      </Form.Control>
                    </ListGroup.Item>
                  )}

                  <ListGroupItem className="bg-transparent px-0 pb-0 pt-3">
                    <Button
                      className='w-100 py-3 font-weight-bold d-flex align-items-center justify-content-center gap-2 btn-add-cart-large'
                      variant='warning'
                      type='button'
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      <FaShoppingCart /> Add To Cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row className='review d-block d-md-none mt-4'>
            <Col md={12}>
              <Reviews
                product={product}
                userInfo={userInfo}
                rating={rating}
                laoding={isCreateProductReviewLoading}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                submitHandler={submitHandler}
              />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ProductPage;
