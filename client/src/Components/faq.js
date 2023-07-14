import Footer from "./footer";
import Header from "./header";
import { useEffect } from "react";
import WOW from "wowjs";
import Breadcrumbs from "../Section/breadcrumbsSection";

function FAQ() {
  
  useEffect(() => {
    new WOW.WOW().init();
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <Breadcrumbs title="Frequently Asked Questions" />
      <section class="faq-area section">
        <div class="container">
          <div class="row">
            <div class="col-12 col-lg-6">
              <div class="d-flex single-faq wow fadeInUp" data-wow-delay=".2s">
                <div class="cercle">
                  <span>?</span>
                </div>
                <div class="content">
                  <h4 class="heading">How do I place an ad?</h4>

                  <p class="text">
                    Job Posting is also known as job ads, job postings are the
                    primary means through which companies recruit new applicants
                    for available positions. Traditionally, job postings were
                    often posted in the classifieds section of newspapers.
                    Today, job ads are typically published online.
                  </p>
                  <p class="text">
                    1. Please login to your employer account - go to the Post a
                    Job section
                    <br />
                    2. Fill up the form as per your job requirements
                    <br />
                    3. Click on the option of "Post Job".
                  </p>
                </div>
              </div>

              <div class="d-flex single-faq wow fadeInUp" data-wow-delay=".4s">
                <div class="cercle">
                  <span>?</span>
                </div>
                <div class="content">
                  <h4 class="heading">Do I get free updates?</h4>

                  <p class="text">
                    Yes. We update all of our themes with each Bootstrap update,
                    plus are constantly adding new components, pages, and
                    features to our themes.
                  </p>
                </div>
              </div>

              <div class="d-flex single-faq wow fadeInUp" data-wow-delay=".4s">
                <div class="cercle">
                  <span>?</span>
                </div>
                <div class="content">
                  <h4 class="heading">
                    How Long will it take to get my package?
                  </h4>

                  <p class="text">
                    As of now, Job Portal is free for all. But it will charge in
                    future based on category.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-6">
              <div class="d-flex single-faq wow fadeInUp" data-wow-delay=".2s">
                <div class="cercle">
                  <span>?</span>
                </div>
                <div class="content">
                  <h4 class="heading">Is there a money back guarantee?</h4>

                  <p class="text">
                    No, Job Portal doesn’t have a refund policy, that means they
                    don’t pay any refund if the user is not satisfied with their
                    services.
                  </p>
                </div>
              </div>

              <div class="d-flex single-faq wow fadeInUp" data-wow-delay=".4s">
                <div class="cercle">
                  <span>?</span>
                </div>
                <div class="content">
                  <h4 class="heading">
                    Does it work with Rails? React? Laravel?
                  </h4>

                  <p class="text">
                    Yes. Landkit has basic CSS/JS files you can include. If you
                    want to enable deeper customization, you can integrate it
                    into your assets pipeline or build processes.
                  </p>
                </div>
              </div>

              <div class="d-flex single-faq wow fadeInUp" data-wow-delay=".4s">
                <div class="cercle">
                  <span>?</span>
                </div>
                <div class="content">
                  <h4 class="heading">How can I deactivate my account?</h4>

                  <p class="text">
                    In case you are not looking for a job right now, you can
                    deactivate your account. This will stop all emails from Job
                    Portal. We will reactivate your account only when you login
                    again on Job Portal.
                  </p>
                  <p class="text">
                    To deactivate your Job Portal account, go to ‘Deactivate
                    Account’ in the ‘Settings’ page. Here, select proper reason
                    for deactivating account and then select Deactivate Account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
export default FAQ;
