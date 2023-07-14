import { useEffect } from "react";

import WOW from "wowjs";

function JobCategorySection(props) {
  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <section class="job-category section">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section-title">
              <span class="wow fadeInDown" data-wow-delay=".2s">
                Job Category
              </span>
              <h2 class="wow fadeInUp" data-wow-delay=".4s">
                Choose Your Desire Category
              </h2>
              <p class="wow fadeInUp" data-wow-delay=".6s">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>
        <div class="cat-head">
          <div class="row">
            <div class="col-lg-3 col-md-6 col-12">
              <a
                href="/browseCategories"
                class="single-cat wow fadeInUp"
                data-wow-delay=".2s"
              >
                <div class="icon">
                  <i class="lni lni-cog"></i>
                </div>
                <h3>
                  Technical
                  <br /> Support
                </h3>
              </a>
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <a
                href="/browseCategories"
                class="single-cat wow fadeInUp"
                data-wow-delay=".4s"
              >
                <div class="icon">
                  <i class="lni lni-layers"></i>
                </div>
                <h3>
                  Business
                  <br /> Development
                </h3>
              </a>
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <a
                href="/browseCategories"
                class="single-cat wow fadeInUp"
                data-wow-delay=".6s"
              >
                <div class="icon">
                  <i class="lni lni-home"></i>
                </div>
                <h3>
                  Real Estate
                  <br /> Business
                </h3>
              </a>
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <a
                href="/browseCategories"
                class="single-cat wow fadeInUp"
                data-wow-delay=".8s"
              >
                <div class="icon">
                  <i class="lni lni-search"></i>
                </div>
                <h3>
                  Share Market
                  <br /> Analysis
                </h3>
              </a>
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <a
                href="/browseCategories"
                class="single-cat wow fadeInUp"
                data-wow-delay=".2s"
              >
                <div class="icon">
                  <i class="lni lni-investment"></i>
                </div>
                <h3>
                  Finance & Banking <br /> Service
                </h3>
              </a>
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <a
                href="/browseCategories"
                class="single-cat wow fadeInUp"
                data-wow-delay=".4s"
              >
                <div class="icon">
                  <i class="lni lni-cloud-network"></i>
                </div>
                <h3>
                  IT & Networing <br /> Sevices
                </h3>
              </a>
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <a
                href="/browseCategories"
                class="single-cat wow fadeInUp"
                data-wow-delay=".6s"
              >
                <div class="icon">
                  <i class="lni lni-restaurant"></i>
                </div>
                <h3>
                  Restaurant <br /> Services
                </h3>
              </a>
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <a
                href="/browseCategories"
                class="single-cat wow fadeInUp"
                data-wow-delay=".8s"
              >
                <div class="icon">
                  <i class="lni lni-fireworks"></i>
                </div>
                <h3>
                  Defence & Fire <br /> Service
                </h3>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default JobCategorySection;
