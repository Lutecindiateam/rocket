import Footer from "./footer";
import Header from "./header";
import { useEffect } from "react";
import WOW from "wowjs";
import Breadcrumbs from "../Section/breadcrumbsSection";

function PrivacyPolicy() {
  
  useEffect(() => {
    new WOW.WOW().init();
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <Breadcrumbs title="Privacy Policy" />
      <div class="privacy-policy section">
        <div class="container">
          <div class="row mb-n5">
            <div class="col-lg-10 offset-lg-1 col-12">
              <div class="policy-inner">
                <div class="policy-details-body">
                  <h6 class="mb-3">Introduction</h6>
                  <p>
                    We created this summary of Job Portal’s Full Privacy Policy
                    to help guide you through it and keep you informed about how
                    we handle your information.
                  </p>
                  <p>
                    Our Privacy Policy details how we collect, use and disclose
                    the Personal and Non-Personal Data we collect from and about
                    you when you access or use our online and/or mobile
                    websites, applications, services, and software, interactions
                    with us on the phone or in person, or that we obtain from
                    publicly available sources or third-party sources.
                  </p>
                  <p>
                    Our Sites covered by this Privacy Policy include the
                    affiliated online and/or mobile websites, applications,
                    services, and software of Job Portal, Engineerjobs,
                    Careesma, Gigajob, HRTechPrivacy.com, Resume.com,
                    RescueMyResumes.com, Resumeperfector.com, Workopolis and
                    Wowjobs.
                  </p>
                  <p>
                    Job Portal’s core mission is to help people get jobs and
                    help Employers find great candidates. Since each of our
                    affiliates shares that core mission, we have developed a
                    Privacy Center as a way of educating our users about who our
                    affiliates are and how we share data with them. You can find
                    out more about how we share data between affiliates on our
                    Privacy Center FAQ page.
                  </p>
                  <h6 class="mb-3">Who Is Responsible For Your Information?</h6>
                  <p>
                    The Job Portal entity responsible for your information will
                    depend on your location and whether we are acting as a data
                    controller or data processor.
                  </p>
                  <h6 class="mb-3 mt-4">
                    What Information Do we Collect About You?
                  </h6>
                  <p>Across the Sites we collect information:</p>
                  <ul>
                    <li>
                      you choose to provide to us through our Sites, e.g.
                      contact details, resume details, location data;
                    </li>
                    <li>
                      through your activity on our Sites, e.g. information from
                      your device and actions taken on the Sites, searches you
                      run or jobs you click on;
                    </li>
                    <li>
                      when you apply to jobs, use screener or assessment
                      questions or automated phone screening, or log in from
                      third party sites; and
                    </li>
                    <li>
                      where you use chargeable services or are an Employer
                      providing necessary Employer information, e.g., for
                      verification purposes.
                    </li>
                  </ul>
                  <p>
                    Job Portal may also collect information about your
                    interactions with our social media accounts on third-party
                    platforms, or by obtaining data such as resumes, prospect
                    data or recruiting progress data from third parties.
                  </p>
                  <p>
                    Full details of the types of Personal Data we collect from
                    you and details of the legal basis for such collection are
                    detailed in section 2 of our full Privacy Policy.
                  </p>
                  <h6 class="mb-3 mt-4">Why Do we Collect This Information?</h6>
                  We collect and use your information in order to help Job
                  Seekers find jobs, to help Employers find candidates, and to
                  provide and improve our services to you. To summarize, we use
                  your Personal Data, where applicable, to:
                  <ul>
                    <li>
                      create your account and send you Job Alerts or other
                      promotional materials;
                    </li>
                    <li>
                      give you relevant search results and job recommendations;
                    </li>
                    <li>
                      facilitate communication as part of the job search,
                      application and interview process;
                    </li>
                    <li>
                      make your resume available to third parties, depending on
                      your privacy settings (e.g. private or public resume);
                    </li>
                    <li>match Job Seekers with Employer Job Listings;</li>
                    <li>
                      prevent fraud, spam and other potentially fraudulent or
                      illegal activities;
                    </li>
                    <li>
                      facilitate payment, in connection with chargeable
                      services;
                    </li>
                    <li>
                      carry out automated processing in order to provide many of
                      our services;
                    </li>
                    <li>
                      enhance and optimize our services and security for Job
                      Seekers and Employers by data sharing with our affiliates;
                    </li>
                    <li>
                      improve our services, maintain product quality and protect
                      users; and
                    </li>
                    <li>
                      aggregate and share with third parties content posted on
                      Job Portal intended to be publicly available.
                    </li>
                  </ul>
                  <p>
                    Full details of the purposes for which we use your Personal
                    Data are set out in sections 4, 5 and 8 of our full Privacy
                    Policy.
                  </p>
                  <h6 class="mb-3 mt-4">Confidentiality And Security</h6>
                  <p>
                    Job Portal uses reasonable security measures to help protect
                    your personal data. However, no method of transmission or
                    storage of information via the Internet can be 100% secure.
                    For example, emails or other messages sent via your web
                    browser, or resumes shared with employers may not be
                    encrypted by the recipient. Where the security of your
                    information is beyond our control, we cannot guarantee the
                    privacy of such information. Please see our Security page
                    for more information about how Job Portal protects your
                    information.
                  </p>
                  <p>
                    Please note that we also use third-party cloud service
                    providers to process your personal data as described by
                    section 4.17 of this policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default PrivacyPolicy;
