import { useEffect } from "react";

import WOW from "wowjs";

function ClientLogoSection() {
  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <div class="client-logo-section">
      <div class="container">
        <div class="client-logo-wrapper">
          <div class="client-logo-carousel d-flex align-items-center justify-content-between">
            <div class="client-logo">
              <img src="assets/images/clients/client1.png" alt="#" />
            </div>
            <div class="client-logo">
              <img src="assets/images/clients/client2.png" alt="#" />
            </div>
            <div class="client-logo">
              <img src="assets/images/clients/client3.png" alt="#" />
            </div>
            <div class="client-logo">
              <img src="assets/images/clients/client4.png" alt="#" />
            </div>
            <div class="client-logo">
              <img src="assets/images/clients/client5.png" alt="#" />
            </div>
            <div class="client-logo">
              <img src="assets/images/clients/client6.png" alt="#" />
            </div>
            <div class="client-logo">
              <img src="assets/images/clients/client2.png" alt="#" />
            </div>
            <div class="client-logo">
              <img src="assets/images/clients/client3.png" alt="#" />
            </div>
            <div class="client-logo">
              <img src="assets/images/clients/client4.png" alt="#" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ClientLogoSection;
