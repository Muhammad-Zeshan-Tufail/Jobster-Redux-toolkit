import Wrapper from "../assets/wrappers/RegisterPage";
import { FormRow, Logo } from "../components";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: "",
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const { user,isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please Fill Out All Fields");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user,navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {/* Name field  */}
        {!values.isMember && (
          <FormRow
            name="name"
            type="text"
            value={values.name}
            onChange={onChange}
          />
        )}
        {/* Email field  */}
        <FormRow
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
        />
        {/* Password field  */}
        <FormRow
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
        />
        <button type="submit" disabled={isLoading} className="btn btn-block">
          {values.isMember
            ? `${isLoading ? "Loading..." : "Login"}`
            : `${isLoading ? "Loading..." : "Register"}`}
        </button>
        <p>
          {values.isMember ? "Not a member?" : "Already a member"}
          <button type="button" className="member-btn" onClick={toggleMember}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
