import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, login, logout } from "../features/userReducer"; // import logout
import Footer from "../components/Footer";
import Header from "../components/Header";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (isLogin) {
      dispatch(login({ name: "User", email }));
      toast.success(`Login Successful! Welcome back, ${email}.`);
    } else {
      dispatch(signup({ name, email }));
      toast.success(`Signup Successful! Welcome, ${name}.`);
    }

    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.error("You have been signed out.");
    setIsLogin(true);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <>
      <Header />

      <ToastContainer position="top-right" className="mt-5" autoClose={3000} />
      <main className="container py-3">
        <div className="row justify-content-center">
          <div className="col-md-5 bg-light py-3 my-3 rounded">
            <h3 className="text-center">🛍️</h3>
            <h2 className="text-center pb-2" style={{ fontFamily: "cursive" }}>
              {isLogin ? "Login to see more" : "Create your account"}
            </h2>

            {!user ? (
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <>
                    <label htmlFor="name" className="form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="form-control mb-3"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </>
                )}

                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-control mb-3"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />

                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="form-control mb-3"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />

                {!isLogin && (
                  <>
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password:
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      className="form-control mb-3"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </>
                )}

                <button
                  type="submit"
                  className="btn btn-primary col-12 rounded mb-3">
                  {isLogin ? "Login" : "Sign Up"}
                </button>
              </form>
            ) : (
              <div className="text-center">
                <p>
                  You are logged in as{" "}
                  <strong>{user.name || user.email}</strong>.
                </p>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Sign Out
                </button>
              </div>
            )}

            <div className="text-center mt-3">
              {!user &&
                (isLogin ? (
                  <>
                    Don't have an account?{" "}
                    <button
                      className="btn btn-link p-0"
                      onClick={() => {
                        setIsLogin(false);
                        setFormData({
                          name: "",
                          email: "",
                          password: "",
                          confirmPassword: "",
                        });
                      }}>
                      Sign Up here
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      className="btn btn-link p-0"
                      onClick={() => {
                        setIsLogin(true);
                        setFormData({
                          name: "",
                          email: "",
                          password: "",
                          confirmPassword: "",
                        });
                      }}>
                      Login here
                    </button>
                  </>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
