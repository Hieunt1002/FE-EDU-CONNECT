import {decodeToken, getRole} from "../../utils/commons"
import PageNotFound from "../../pages/PageNotFound";
const TutorRoute = ({ element, allowedRoles }) => {
  const { isLogin, role } = decodeToken()
  return isLogin && allowedRoles.includes(getRole(role)) ? element : <PageNotFound/>
};
export default TutorRoute;
