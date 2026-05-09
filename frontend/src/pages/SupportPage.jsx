import React, { useState } from 'react';
import { Row, Col, Form, Button, Card, Accordion } from 'react-bootstrap';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaQuestionCircle, FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Meta from '../components/Meta';

const SupportPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      toast.error('Please fill in all fields.');
      return;
    }
    toast.success('Your support message has been sent successfully! Our team will contact you within 24 hours.');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <>
      <Meta title="Customer Support | NextBuy" />
      <div className="py-4">
        <h1 className="text-center mb-5 font-weight-bold text-dark">
          How Can We Help You Today?
        </h1>

        <Row className="g-5">
          {/* Quick Contact & Info Column */}
          <Col lg={4}>
            <h3 className="mb-4 font-weight-bold text-warning">Get In Touch</h3>
            <p className="text-muted mb-4">
              Have questions about your order, delivery, or product technical specifications? Reach out to our dedicated support crew!
            </p>

            <Card className="border-0 shadow-sm rounded-lg mb-4 bg-white">
              <Card.Body className="p-4 d-flex align-items-center gap-3">
                <div className="bg-warning text-dark rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                  <FaPhoneAlt size={20} />
                </div>
                <div>
                  <h6 className="font-weight-bold mb-1">Phone Number</h6>
                  <p className="text-muted small mb-0">+91 79xx79xxxx</p>
                </div>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm rounded-lg mb-4 bg-white">
              <Card.Body className="p-4 d-flex align-items-center gap-3">
                <div className="bg-warning text-dark rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <h6 className="font-weight-bold mb-1">Email Support</h6>
                  <p className="text-muted small mb-0">support@nextbuy.com</p>
                </div>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm rounded-lg mb-4 bg-white">
              <Card.Body className="p-4 d-flex align-items-center gap-3">
                <div className="bg-warning text-dark rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <h6 className="font-weight-bold mb-1">HQ Address</h6>
                  <p className="text-muted small mb-0">Connaught Place, New Delhi, India</p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Interactive Support Form Column */}
          <Col lg={8}>
            <Card className="border-0 shadow-sm rounded-lg bg-white p-4">
              <Card.Body>
                <h3 className="mb-4 font-weight-bold text-warning d-flex align-items-center gap-2">
                  <FaPaperPlane size={20} /> Send Us a Message
                </h3>
                <Form onSubmit={submitHandler}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group controlId="name" className="mb-3">
                        <Form.Label className="font-weight-bold small text-dark">Your Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-light border-0 py-2.5"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="email" className="mb-3">
                        <Form.Label className="font-weight-bold small text-dark">Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-light border-0 py-2.5"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group controlId="subject" className="mb-3">
                    <Form.Label className="font-weight-bold small text-dark">Subject</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="What is your query regarding?"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="bg-light border-0 py-2.5"
                    />
                  </Form.Group>

                  <Form.Group controlId="message" className="mb-4">
                    <Form.Label className="font-weight-bold small text-dark">Message Details</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="How can we assist you?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-light border-0 py-2.5"
                    />
                  </Form.Group>

                  <Button type="submit" variant="warning" className="w-100 py-2.5 font-weight-bold text-dark">
                    Submit Support Ticket
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* FAQs Section */}
        <div className="mt-5 pt-4">
          <h3 className="mb-4 font-weight-bold text-warning text-center d-flex align-items-center justify-content-center gap-2">
            <FaQuestionCircle size={22} /> Frequently Asked Questions
          </h3>

          <Accordion defaultActiveKey="0" className="shadow-sm rounded overflow-hidden">
            <Accordion.Item eventKey="0" className="border-bottom">
              <Accordion.Header className="font-weight-bold">How does Cash on Delivery (COD) work?</Accordion.Header>
              <Accordion.Body className="text-muted bg-white">
                Cash on Delivery allows you to pay for your orders with physical cash when the delivery executive hands over the package at your doorstep. No advance online payment is required!
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1" className="border-bottom">
              <Accordion.Header className="font-weight-bold">How long does shipping normally take?</Accordion.Header>
              <Accordion.Body className="text-muted bg-white">
                Our standard deliveries are executed within 2-4 business days across major cities. For remote and rural locations, shipping might take up to 5-7 business days.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2" className="border-bottom">
              <Accordion.Header className="font-weight-bold">What is the replacement policy?</Accordion.Header>
              <Accordion.Body className="text-muted bg-white">
                We offer a hassle-free 10-day replacement policy on all items. If you receive a damaged or malfunctioning device, you can raise a ticket or email us to get a free doorstep replacement.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header className="font-weight-bold">Can I cancel my order?</Accordion.Header>
              <Accordion.Body className="text-muted bg-white">
                Yes! You can cancel your order at any time before it has been shipped directly from your customer dashboard, or by reaching out to our support helpline.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default SupportPage;
