import { useEffect } from "react";
import { Link } from "react-router-dom";
import WOW from "wowjs";
function Error() {
  useEffect(() => {
    new WOW.WOW().init();
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div class="error-area">
        <div class="d-table">
          <div class="d-table-cell">
            <div class="container">
              <div class="error-content">
                <h1>Opps!</h1>
                <h2>Here Is Some Problem</h2>
                <p>The page you are looking for it maybe deleted</p>
                <div class="button">
                  <Link to="/home" class="btn">
                    Go To Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Error;
