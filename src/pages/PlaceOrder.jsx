import { useState, useEffect } from "react";
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
  const [savedAddresses, setSavedAddresses] = useState([]);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("addresses")) || [];
    setSavedAddresses(stored);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDeleteAddress = (indexToDelete) => {
    const updated = savedAddresses.filter((_, idx) => idx !== indexToDelete);
    setSavedAddresses(updated);
    localStorage.setItem("addresses", JSON.stringify(updated));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Save address if not already saved
    const existingAddresses =
      JSON.parse(localStorage.getItem("addresses")) || [];
    const isDuplicate = existingAddresses.some(
      (addr) =>
        addr.fullName === formData.fullName &&
        addr.mobile === formData.mobile &&
        addr.house === formData.house
    );
    if (!isDuplicate) {
      const newAddresses = [...existingAddresses, formData];
      localStorage.setItem("addresses", JSON.stringify(newAddresses));
      setSavedAddresses(newAddresses);
    }

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

        {savedAddresses.length > 0 && (
          <div className="mb-4">
            <h5>Saved Addresses</h5>
            {savedAddresses.map((addr, index) => (
              <div key={index} className="border rounded p-2 mb-2">
                <p>
                  <strong>{addr.fullName}</strong>
                  <br />
                  {addr.house}, {addr.area}, {addr.town}, {addr.state},{" "}
                  {addr.pincode}
                  <br />
                  📞 {addr.mobile}
                </p>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => setFormData(addr)}>
                  Use This
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteAddress(index)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

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
              <option value="Andaman and Nicobar Islands">
                Andaman and Nicobar Islands
              </option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Dadra and Nagar Haveli and Daman and Diu">
                Dadra and Nagar Haveli and Daman and Diu
              </option>
              <option value="Delhi">Delhi</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana"></option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
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
