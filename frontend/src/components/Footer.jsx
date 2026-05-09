import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaShieldAlt, FaTruck } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='premium-footer mt-5'>
      <Container>
        <Row className='py-5 gy-4'>
          {/* Brand Section */}
          <Col lg={4} md={12} className='brand-col'>
            <div className='footer-brand mb-3'>NextBuy</div>
            <p className='footer-tagline'>
              Your ultimate destination for premium laptops, gaming gear, and state-of-the-art tech accessories. Experience seamless shopping with NextBuy today.
            </p>
            <div className='social-icons d-flex gap-3 mt-4'>
              <a href='https://facebook.com' target='_blank' rel='noreferrer' aria-label='Facebook'>
                <FaFacebook />
              </a>
              <a href='https://twitter.com' target='_blank' rel='noreferrer' aria-label='Twitter'>
                <FaTwitter />
              </a>
              <a href='https://instagram.com' target='_blank' rel='noreferrer' aria-label='Instagram'>
                <FaInstagram />
              </a>
              <a href='https://linkedin.com' target='_blank' rel='noreferrer' aria-label='LinkedIn'>
                <FaLinkedin />
              </a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={4} sm={6}>
            <h5 className='footer-header'>Shop</h5>
            <ul className='footer-links list-unstyled'>
              <li><Link to='/'>Laptops & PCs</Link></li>
              <li><Link to='/'>Gaming Accessories</Link></li>
              <li><Link to='/'>Headphones</Link></li>
              <li><Link to='/'>New Launches</Link></li>
            </ul>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={4} sm={6}>
            <h5 className='footer-header'>Company</h5>
            <ul className='footer-links list-unstyled'>
              <li><Link to='/profile'>My Profile</Link></li>
              <li><Link to='/cart'>View Cart</Link></li>
              <li><Link to='/'>About Us</Link></li>
              <li><Link to='/'>Contact Support</Link></li>
            </ul>
          </Col>

          {/* Value Proposition / COD */}
          <Col lg={4} md={4} sm={12} className='props-col'>
            <h5 className='footer-header'>Our Promises</h5>
            <div className='prop-item d-flex align-items-center gap-3 mb-3'>
              <div className='prop-icon-wrapper'>
                <FaTruck />
              </div>
              <div>
                <h6 className='prop-title mb-0'>Cash on Delivery (COD)</h6>
                <p className='prop-desc mb-0'>Pay at your doorstep with absolute safety.</p>
              </div>
            </div>
            <div className='prop-item d-flex align-items-center gap-3'>
              <div className='prop-icon-wrapper'>
                <FaShieldAlt />
              </div>
              <div>
                <h6 className='prop-title mb-0'>Genuine Products</h6>
                <p className='prop-desc mb-0'>100% authentic tech and direct brand warranty.</p>
              </div>
            </div>
          </Col>
        </Row>

        <hr className='footer-divider' />

        {/* Copyright */}
        <Row className='py-4 align-items-center'>
          <Col md={6} className='text-center text-md-start mb-2 mb-md-0'>
            <span className='copyright-text'>
              &copy; {currentYear} NextBuy Inc. All rights reserved.
            </span>
          </Col>
          <Col md={6} className='text-center text-md-end'>
            <div className='footer-bottom-links gap-4 justify-content-center justify-content-md-end d-flex'>
              <Link to='/'>Privacy Policy</Link>
              <Link to='/'>Terms of Service</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
