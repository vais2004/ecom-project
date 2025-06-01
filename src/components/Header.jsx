import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../features/searchSlice";
import { logout } from "../features/authenticationSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showUserInfo, setShowUserInfo] = useState(false);

  const search = useSelector((state) => state.search.text);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalCartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const wishlistCount = useSelector(
    (state) => state.wishlist?.wishlistItems?.length || 0
  );
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const totalOrderCount = orders.length;

  const user = useSelector((state) => state.user.userInfo);
  const isAuthenticated = Boolean(user);

  const handleSearchChange = (event) => {
    dispatch(setSearchText(event.target.value));
    navigate("/products");
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowUserInfo(false);
    navigate("/login");
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand" style={{ fontFamily: "cursive" }}>
          🛍️MyStyleSpot
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="col-lg-6 mx-auto my-2">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="navbar-nav ms-auto">
            <div className="btn-group" role="group">
              <Link
                to="/wishlist"
                className="nav-link  pe-3 px-3 position-relative">
                Wishlist <i className="bi bi-heart"></i>
                <span
                  className="position-absolute top-0 me-5 mt-2 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.7rem" }}>
                  {wishlistCount}
                </span>
              </Link>

              <Link to="/cart" className="nav-link pe-2 px-3 position-relative">
                Cart <i className="bi bi-cart4"></i>
                <span
                  className="position-absolute top-0 me-5 mt-2 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.7rem" }}>
                  {totalCartQuantity}
                </span>
              </Link>

              <Link
                to="/orders"
                className="nav-link pe-2 px-3 position-relative">
                Orders <i class="bi bi-bag-check"></i>
              <span
                  className="position-absolute top-0 me-5 mt-2 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.7rem" }}>
                  {totalOrderCount}
                </span>
              </Link>

              <div className="position-relative">
                <img
                  src="https://harvesthosts-marketing-assets.s3.amazonaws.com/wp-content/uploads/2021/11/whoknows-1.jpg"
                  alt="Avatar"
                  className="rounded-circle mx-4"
                  style={{ width: "38px", height: "35px", cursor: "pointer" }}
                  onClick={() => {
                    if (isAuthenticated) {
                      setShowUserInfo(!showUserInfo);
                    } else {
                      navigate("/login");
                    }
                  }}
                />
                {isAuthenticated && showUserInfo && (
                  <div
                    className="position-absolute bg-white p-3 rounded"
                    style={{
                      top: "50px",
                      right: "0",
                      minWidth: "200px",
                      zIndex: 1,
                    }}>
                    <p className="mb-1">
                      <strong>Name:</strong> {user.name || "User"}
                    </p>
                    <p className="mb-2">
                      <strong>Email:</strong> {user.email}
                    </p>
                    <button
                      className="btn btn-sm btn-outline-danger w-100"
                      onClick={handleLogout}>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
