import { React } from 'react';
import { useNavigate } from "react-router-dom";


const NotFound = () => {

      const navigate = useNavigate();

      const navigateToHome = () => {
        navigate("/home");
      }

return (
    <body>
        <div class="d-flex align-items-center justify-content-center vh-100">
            <div class="text-center">
                <h1 class="display-1 fw-bold">404</h1>
                <p class="fs-3"> <span class="text-danger">Opps!</span> Page not found.</p>
                <p class="lead">
                    The page you’re looking for doesn’t exist.
                  </p>
                <button class="btn btn-primary" onClick={navigateToHome}>Home</button>
            </div>
        </div>
    </body>
    );
}

export default NotFound;