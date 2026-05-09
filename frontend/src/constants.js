// API Base URL Configuration
export const BASE_URL = 
  process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000' 
    : process.env.REACT_APP_API_URL || '';

export const PRODUCTS_URL = '/api/v1/products';
export const UPLOAD_URL = '/api/v1/upload';
export const USERS_URL = '/api/v1/users';
export const ORDERS_URL = '/api/v1/orders';
