import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaLaptop, FaGamepad, FaHeadphones, FaInfoCircle, FaCrown, FaWrench } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { toast } from 'react-toastify';
import SearchBox from './SearchBox';

const Header = () => {
  const { cartItems } = useSelector(state => state.cart);
  const { userInfo } = useSelector(state => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
      toast.success('Logout successful');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <Navbar
      expand='lg'
      collapseOnSelect
      className='fixed-top z-2 modern-header'
    >
      <Container>
        {/* Brand Logo */}
        <LinkContainer to='/'>
          <Navbar.Brand className='d-flex align-items-center gap-2'>
            <span className='brand-icon'>⚡</span>
            <span className='brand-text'>NextBuy</span>
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls='basic-navbar-nav' className='border-0 bg-transparent shadow-none' />

        <Navbar.Collapse id='basic-navbar-nav'>
          {/* Main Navigation - Left/Center */}
          <Nav className='me-auto align-items-center gap-1 my-2 my-lg-0'>
            {/* Laptops category link */}
            <LinkContainer to={{ pathname: '/', search: '?category=Electronics' }}>
              <Nav.Link className='header-option-link'>
                <FaLaptop className='option-icon text-warning' />
                <span>Laptops</span>
              </Nav.Link>
            </LinkContainer>

            {/* Gaming category link */}
            <LinkContainer to={{ pathname: '/', search: '?category=Gaming Accessories' }}>
              <Nav.Link className='header-option-link'>
                <FaGamepad className='option-icon text-info' />
                <span>Gaming</span>
              </Nav.Link>
            </LinkContainer>

            {/* Headphones category link */}
            <LinkContainer to={{ pathname: '/', search: '?category=Audio' }}>
              <Nav.Link className='header-option-link'>
                <FaHeadphones className='option-icon text-success' />
                <span>Audio</span>
              </Nav.Link>
            </LinkContainer>

            {/* Support/Info link */}
            <LinkContainer to='/support'>
              <Nav.Link className='header-option-link'>
                <FaInfoCircle className='option-icon text-primary' />
                <span>Support</span>
              </Nav.Link>
            </LinkContainer>
          </Nav>

          {/* Search Box & Auth Options - Right */}
          <Nav className='align-items-center gap-2'>
            {/* Modern integrated Search Box */}
            <div className='header-search-wrapper me-lg-2'>
              <SearchBox />
            </div>

            {/* Cart Link with micro badge */}
            <LinkContainer to='/cart'>
              <Nav.Link className='cart-nav-button d-flex align-items-center'>
                <div className='cart-icon-wrapper position-relative'>
                  <FaShoppingCart />
                  {cartItems.length > 0 && (
                    <span className='cart-badge-glowing'>
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </span>
                  )}
                </div>
                <span className='ms-2 d-inline-block d-lg-none'>Cart</span>
              </Nav.Link>
            </LinkContainer>

            {/* User Dropdown Profile */}
            {userInfo ? (
              <NavDropdown 
                title={
                  <div className='d-flex align-items-center gap-2 text-white'>
                    <div className='user-avatar'>
                      {userInfo.name.charAt(0).toUpperCase()}
                    </div>
                    <span className='d-none d-lg-inline'>Hello, {userInfo.name.split(' ')[0]}</span>
                  </div>
                } 
                id='username'
                className='user-dropdown-menu'
              >
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>My Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link className='signin-nav-button btn btn-warning text-dark px-3 py-2'>
                  <FaUser className='me-2' />
                  <span>Sign In</span>
                </Nav.Link>
              </LinkContainer>
            )}

            {/* Admin Shortcuts Dropdown (Visible only to Admin accounts) */}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown 
                title={
                  <div className='d-flex align-items-center gap-2 text-warning font-weight-bold'>
                    <FaCrown className='text-warning animate-bounce' />
                    <span>Admin Panel</span>
                  </div>
                } 
                id='adminmenu'
                className='admin-dropdown-menu ms-lg-2'
              >
                <LinkContainer to='/admin/dashboard'>
                  <NavDropdown.Item className='d-flex align-items-center gap-2'>
                    <FaWrench size={12} /> Dashboard
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/product-list'>
                  <NavDropdown.Item>Manage Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/order-list'>
                  <NavDropdown.Item>Manage Orders</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/user-list'>
                  <NavDropdown.Item>Manage Users</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
