import axios from "axios";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { userLogout } from "../Redux/actions";
// import jwt_decode from "jwt-decode";

function App(props) {
  const navigate = useNavigate();
  useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          props.userLogout();
          navigate("/login")
        }
        return error;
      }
    );
  }, []);
}
const mapStateToProps = (state) => {
  return { candidate: state.candidate, employee: state.employee };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ userLogout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
