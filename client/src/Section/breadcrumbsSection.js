import { useEffect } from "react";

import WOW from "wowjs";

function BreadcrumbsSection(props) {
  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <div class="breadcrumbs overlay">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="breadcrumbs-content">
              <h1 class="page-title">{props.title}</h1>
              <p>
                Business plan draws on a wide range of knowledge from different business
                <br /> disciplines. Business draws on a wide range of different business .
              </p>
            </div>
            <ul class="breadcrumb-nav">
              <li>
                <a href="/home">Home</a>
              </li>
              <li>{props.title}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BreadcrumbsSection;
