import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../features/cartReducer";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PlaceOrder() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    house: "",
    area: "",
    town: "",
    landmark: "",
    pincode: "",
    state: "",
    isDefault: false,
    paymentMethod: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = {
      id: Date.now(),
      address: formData,
      items: cartItems,
      date: new Date().toLocaleString(),
    };
    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, newOrder])
    );

    // Clear cart
    cartItems.forEach((item) => {
      dispatch(removeFromCart(item._id));
    });

    toast.success("Order placed successfully...!");
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <>
        <Header />
        <ToastContainer
          position="top-right"
          className="mt-5"
          autoClose={3000}
        />
        <main className="container text-center my-5">
          <h2 className="text-success mb-3">🎉 Congratulations!</h2>
          <p className="fs-5">Your order has been successfully placed.</p>
          <p className="text-muted">We’ll notify you when it's shipped.</p>
          <a href="/products" className="btn btn-outline-primary mt-4">
            Continue Shopping
          </a>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <ToastContainer position="top-right" className="mt-5" autoClose={3000} />
      <main className="container my-5">
        <h2 className="mb-4 text-center">Place Your Order</h2>
        <form onSubmit={handleSubmit} className="row g-3">
          <h5>Delivery Address</h5>
          <div className="col-md-6">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name (First and Last name)"
              value={formData.fullName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="house"
              placeholder="Flat, House No., Building, Company, Apartment"
              value={formData.house}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="area"
              placeholder="Area, Street, Sector, Village"
              value={formData.area}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="landmark"
              placeholder="Landmark"
              value={formData.landmark}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="town"
              placeholder="Town/City"
              value={formData.town}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="form-select"
              required>
              <option value="">Select State</option>
              <option value="Delhi">Delhi</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="West Bengal">West Bengal</option>
            </select>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className="form-check-input"
              />
              <label className="form-check-label">
                Make this my default address
              </label>
            </div>
          </div>

          <h5 className="mt-4">Select Payment Method</h5>
          <div className="col-12">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={formData.paymentMethod === "COD"}
                onChange={handleChange}
                className="form-check-input"
                required
              />
              <label className="form-check-label">Cash on Delivery</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="paymentMethod"
                value="UPI"
                checked={formData.paymentMethod === "UPI"}
                onChange={handleChange}
                className="form-check-input"
              />
              <label className="form-check-label">UPI</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="paymentMethod"
                value="Card"
                checked={formData.paymentMethod === "Card"}
                onChange={handleChange}
                className="form-check-input"
              />
              <label className="form-check-label">Credit/Debit Card</label>
            </div>
          </div>

          <div className="col-12 mt-4">
            <button className="btn btn-success w-100" type="submit">
              Finalize Order
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
