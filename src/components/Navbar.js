import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from './screen/Cart';
import { useCart } from './Contextreducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const data = useCart();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <Link className="navbar-brand fs-1 fst-italic" to="/">
          FoodieFusion
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item active">
              <Link className="nav-link active fs-5" to="/">
                Home <span className="sr-only"></span>
              </Link>
            </li>
            {localStorage.getItem('authToken') ? (
              <li className="nav-item active">
                <Link className="nav-link active fs-5" to="/myOrder">
                  MyOrders
                </Link>
              </li>
            ) : null}
          </ul>
          {!localStorage.getItem('authToken') ? (
            <div className="d-flex">
              <Link className="btn bg-white text-success mx-1" to="/Login">
                Login
              </Link>
              <Link className="btn bg-white text-success mx-1" to="/Createuser">
                SignUp
              </Link>
            </div>
          ) : (
            <div>
              <button
                className={`btn bg-white text-success mx-2 ${
                  cartView ? 'active' : ''
                }`}
                onClick={() => {
                  setCartView(!cartView);
                }}
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded={cartView ? 'true' : 'false'}
              >
                MyCart
                <Badge pill bg="danger">
                  {data.length}
                </Badge>
              </button>
              {cartView ? (
                <Modal onClose={() => setCartView(false)}>
                  <Cart />
                </Modal>
              ) : null}
              <div
                className="btn bg-white text-danger mx-2"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}




