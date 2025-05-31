import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [cancelMessage, setCancelMessage] = useState("");

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  
  const addDays = (dateString, days) => {
    // convert the string to object
    const date = new Date(dateString);

    // if the date is valid
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    date.setDate(date.getDate() + days);

    return date.toDateString();
  };

  const cancelOrder = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      const updatedOrders = orders.filter((order) => order.id !== orderId);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
      setCancelMessage("Your order has been cancelled successfully!");
      toast.error("🛑 Your order has been cancelled successfully! 🛑");

      // setTimeout(() => setCancelMessage(""), 3000);
    }
  };

  if (orders.length === 0) {
    return (
      <>
        <Header />
        <ToastContainer
          position="top-right"
          className="mt-5"
          autoClose={3000}
        />
        <main className="container text-center my-5">
          <h3>No orders found😞</h3>
          <h5>
            <i>
              💖 I saved this space just for you... now let’s fill it with
              something fabulous😍
            </i>
          </h5>
          <p className="text-muted">
            <i>Your fashion soulmate is waiting...!</i>
          </p>
          <a href="/products" className="btn btn-outline-warning col-4 mt-4">
            Shop Now
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
        <h2 className="mb-4 text-center">Your Orders</h2>

        {cancelMessage && (
          <p className="alert alert-warning text-center">{cancelMessage}</p>
        )}

        <div className="row justify-content-center">
          {orders.map((order, index) => (
            <div className="col-12 col-md-7 mb-4" key={order.id}>
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h3>Order #{index + 1}</h3>
                  <span className="text-muted">{order.date}</span>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Shipping Address:</h5>
                  <p className="mb-1">
                    {order.address.fullName}, {order.address.house},{" "}
                    {order.address.area}
                  </p>
                  <p className="mb-1">
                    {order.address.town}, {order.address.state} -{" "}
                    {order.address.pincode}
                  </p>
                  <p className="mb-2">Mobile: {order.address.mobile}</p>
                  <p>
                    <strong>Payment Method:</strong>{" "}
                    {order.address.paymentMethod}
                  </p>
                  <hr />
                  <h5 className="mt-4">Item:</h5>
                  <ul className="list-group mb-3">
                    {order.items.map((item) => (
                      <li
                        key={item._id}
                        className="list-group-item d-flex align-items-center">
                        <img
                          src={item.imgUrl}
                          alt={item.name}
                          style={{
                            width: "75px",
                            height: "75px",
                            objectFit: "cover",
                            marginRight: "15px",
                            borderRadius: "5px",
                          }}
                        />
                        <div style={{ flexGrow: 1 }}>
                          <div>{item.name}</div>
                          <small>Qty: {item.quantity}</small>
                        </div>
                        <div>₹{item.price}</div>
                      </li>
                    ))}
                  </ul>

                  <p>
                    <strong>Shipping Date:</strong> {addDays(order.date, 5)}
                  </p>

                  <button
                    className="col-12 btn btn-outline-danger"
                    onClick={() => cancelOrder(order.id)}>
                    Cancel Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
