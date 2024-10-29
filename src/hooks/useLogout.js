import useAuth from "./useAuth";
import { axiosPrivate } from "../api/axios.js";

export default function useLogout() {
  const { auth, setAuth } = useAuth();

  const logout = async () => {
    try {
      const response = await axiosPrivate.post(
        "/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );

      return response;
    } catch (err) {
      console.error(err);
    } finally {
      setAuth(null);
    }
  };

  return logout;
}
