import { logOut } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import style from "./logout.module.scss";
const LogOut = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const response = await fetch("/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        dispatch(logOut());
        console.log("Logout successful");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <button className={style.logout_button} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogOut;
