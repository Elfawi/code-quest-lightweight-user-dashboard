import styled from "styled-components";
import { HiEye, HiEyeOff } from "react-icons/hi";
import PropsType from "prop-types";
const StyledEyeIcon = styled.span`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 51px;
  @media (max-width: 1100px) {
    top: 45px;
  }
  @media (max-width: 900px) {
    top: 40px;
  }
  @media (max-width: 700px) {
    top: 38px;
  }
  @media (max-width: 600px) {
    top: 35px;
  }
`;
function ShowPasswordEye({ showPassword, setShowPassword }) {
  function togglePasswordVisibility() {
    setShowPassword((show) => !show);
  }
  return (
    <StyledEyeIcon>
      {showPassword ? (
        <HiEyeOff size={18} onClick={togglePasswordVisibility} />
      ) : (
        <HiEye size={18} onClick={togglePasswordVisibility} />
      )}
    </StyledEyeIcon>
  );
}
ShowPasswordEye.propTypes = {
  showPassword: PropsType.bool,
  setShowPassword: PropsType.func,
};
export default ShowPasswordEye;
