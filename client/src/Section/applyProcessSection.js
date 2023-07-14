import { useEffect } from "react";

import WOW from "wowjs";

function ApplyProcessSection() {
  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <section class="apply-process section">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-4 col-12">
            <a href="/register">
              <div class="process-item">
                <i class="lni lni-user"></i>
                <h4>Register Your Account</h4>
                <p>
                  Registering you account gives you access to Job Portal for
                  searching jobs.
                </p>
              </div>
            </a>
          </div>
          <div class="col-lg-4 col-md-4 col-12">
            <a href="/addResumeForm">
              <div class="process-item">
                <i class="lni lni-book"></i>
                <h4>Upload Your Resume</h4>
                <p>
                  Resume is often the first impression a potential employer has
                  of you.
                </p>
              </div>
            </a>
          </div>
          <div class="col-lg-4 col-md-4 col-12">
            <a href="/jobList/1/10">
              <div class="process-item">
                <i class="lni lni-briefcase"></i>
                <h4>Apply for Dream Job</h4>
                <p>
                  For getting better future, you can apply for your dream job.
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ApplyProcessSection;
