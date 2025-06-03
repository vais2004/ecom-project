import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <footer className="bg-light py-2 text-center">
        <p className="mb-0 mx-auto text-center">
          &copy; MyStyleSpot. All rights reserved.
        </p>
        <br />
        <div className="pb-3">
          <a
            className="text-black"
            href="https://www.facebook.com/login.php/"
            target="_blank"
            rel="noopener noreferrer">
            <i className="bi bi-facebook px-2"></i>
          </a>
          <a
            className="text-black"
            href="https://x.com/i/flow/login"
            target="_blank"
            rel="noopener noreferrer">
            <i className="bi bi-twitter-x px-2"></i>
          </a>
          <a
            className="text-black"
            href="https://www.instagram.com/accounts/login/"
            target="_blank"
            rel="noopener noreferrer">
            <i className="bi bi-instagram px-2"></i>
          </a>
          <a
            className="text-black"
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer">
            <i className="bi bi-youtube px-2"></i>
          </a>
        </div>
      </footer>
    </>
  );
}
