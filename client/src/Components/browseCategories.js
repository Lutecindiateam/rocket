import Footer from "./footer";
import Header from "./header";
import { useEffect, useState } from "react";
import WOW from "wowjs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestCategory } from "../Redux/actions";
import Breadcrumbs from "../Section/breadcrumbsSection";
import Jobcategory from "../Section/jobCategorySection";

function BrowseCategory(props) {
  
  useEffect(() => {
    new WOW.WOW().init();
    window.scrollTo(0, 0);
  }, []);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    props.requestCategory({});
  }, []);

  useEffect(() => {
    let categoryData = props.candidate.categoryData;
    if (categoryData) {
      if (categoryData?.data?.status == "success") {
        setCategories(categoryData.data.data.categories);
      }
    }
  }, [props.candidate.categoryData]);

  return (
    <>
      <Header />
      <Breadcrumbs title="Job Categories" />
      <Jobcategory />
      <section class="all-categories section">
        <div class="container">
          <h2 class="categories-title">Browse All Categories</h2>
          <div class="row">
            {categories.map((item) => {
              return (
                <div class="col-lg-3 col-md-6 col-xs-12">
                  <ul style={{ margin: "5px" }}>
                    <li>
                      <a href={`/jobCategoryWise/${item.id}/1/10`}>
                        {item.name}
                      </a>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
const mapStateToProps = (state) => {
  return { candidate: state.candidate };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestCategory }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BrowseCategory);
