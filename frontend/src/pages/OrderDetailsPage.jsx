import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, ListGroup, Button, Image, Card } from 'react-bootstrap';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useUpdateDeliverMutation
} from '../slices/ordersApiSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addCurrency } from '../utils/addCurrency';

const OrderDetailsPage = () => {
  const { id: orderId } = useParams();
  const { data: order, isLoading, error, refetch } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: isPayOrderLoading }] = usePayOrderMutation();
  const [updateDeliver, { isLoading: isUpdateDeliverLoading }] = useUpdateDeliverMutation();

  const { userInfo } = useSelector(state => state.auth);

  const payOrderHandler = async () => {
    try {
      await payOrder({ orderId, details: { id: 'COD_PAYMENT', status: 'COMPLETED', update_time: new Date().toISOString(), email_address: order?.user?.email } });
      refetch();
      toast.success('Order marked as paid');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const deliveredHandler = async () => {
    try {
      await updateDeliver(orderId);
      refetch();
      toast.success('Order Delivered');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
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
        <>
          <Meta title={'Order Details'} />
          <h1 className="mb-4">Order ID: {orderId}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush' className="shadow-sm rounded bg-white p-3 mb-4">
                <ListGroup.Item className="border-0">
                  <h2 className="text-warning mb-3">Shipping Details</h2>
                  <div className='mb-2'>
                    <strong>Name:</strong> {order?.user?.name}
                  </div>
                  <div className='mb-2'>
                    <strong>Email:</strong> {order?.user?.email}
                  </div>
                  <div className='mb-3'>
                    <strong>Address:</strong> {order?.shippingAddress?.address},{' '}
                    {order?.shippingAddress?.city}, {order?.shippingAddress?.postalCode},{' '}
                    {order?.shippingAddress?.country}
                  </div>
                  {order?.isDelivered ? (
                    <Message variant='success'>
                      Delivered on {new Date(order?.deliveredAt).toLocaleString()}
                    </Message>
                  ) : (
                    <Message variant='danger'>Not Delivered</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item className="border-top pt-4">
                  <h2 className="text-warning mb-3">Payment Method</h2>
                  <div className='mb-3'>
                    <strong>Method:</strong> {order?.paymentMethod}
                  </div>
                  {order?.isPaid ? (
                    <Message variant='success'>
                      Paid on {new Date(order?.paidAt).toLocaleString()}
                    </Message>
                  ) : (
                    <Message variant='danger'>Not Paid</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item className="border-top pt-4">
                  <h2 className="text-warning mb-3">Order Items</h2>
                  <ListGroup variant='flush'>
                    {order?.orderItems?.map(item => (
                      <ListGroup.Item key={item._id} className="px-0">
                        <Row className="align-items-center">
                          <Col md={2}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col md={6}>
                            <Link
                              to={`/product/${item._id}`}
                              className='product-title text-dark font-weight-bold'
                              style={{ textDecoration: 'none' }}
                            >
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4} className="text-right">
                            {item.qty} x {addCurrency(item.price)} ={' '}
                            <strong>{addCurrency(item.qty * item.price)}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={4}>
              <Card className="shadow-sm border-0 mb-4">
                <Card.Body>
                  <h2 className="text-warning h4 mb-4">Order Summary</h2>
                  <ListGroup variant='flush'>
                    <ListGroup.Item className="d-flex justify-content-between px-0">
                      <span>Items:</span>
                      <span>{addCurrency(order?.itemsPrice)}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between px-0">
                      <span>Shipping:</span>
                      <span>{addCurrency(order?.shippingPrice)}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between px-0">
                      <span>Tax:</span>
                      <span>{addCurrency(order?.taxPrice)}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between px-0 border-top pt-3 font-weight-bold">
                      <span>Total:</span>
                      <span className="text-warning h5 mb-0">{addCurrency(order?.totalPrice)}</span>
                    </ListGroup.Item>

                    {/* Admin Actions */}
                    {userInfo && userInfo.isAdmin && !order?.isPaid && (
                      <ListGroup.Item className="px-0 border-0 pt-3">
                        <Button
                          className='w-100 btn-warning text-dark font-weight-bold py-2'
                          onClick={payOrderHandler}
                          disabled={isPayOrderLoading}
                        >
                          Mark As Paid
                        </Button>
                      </ListGroup.Item>
                    )}

                    {userInfo && userInfo.isAdmin && !order?.isDelivered && (
                      <ListGroup.Item className="px-0 border-0 pt-2">
                        <Button
                          className='w-100 btn-warning text-dark font-weight-bold py-2'
                          onClick={deliveredHandler}
                          disabled={isUpdateDeliverLoading}
                        >
                          Mark As Delivered
                        </Button>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderDetailsPage;
