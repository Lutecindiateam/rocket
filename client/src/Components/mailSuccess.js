import { useEffect } from "react";
import WOW from "wowjs";

function MailSuccess() {

  useEffect(() => {
    new WOW.WOW().init();
    window.scrollTo(0, 0);
  }, []);
  return (
    <>     
      <div class="maill-success">
        <div class="d-table">
          <div class="d-table-cell">
            <div class="container">
              <div class="success-content">
                <h1>Congratulations!</h1>
                <h2>Your Mail Sent Successfully</h2>
                <p>
                  Thanks for contacting with us, We will get back to you asap.
                </p>
                <div class="button">
                  <a href="/home" class="btn">
                    Go To Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>    
    </>
  );
}
export default MailSuccess;
