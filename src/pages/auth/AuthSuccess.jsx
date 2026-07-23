import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLazyGetMeQuery } from "../../api/apiSlice";
import { setUser } from "../../features/auth/authSlice";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getMe, { data, isSuccess, isLoading }] = useLazyGetMeQuery();

  useEffect(() => {
    getMe();
  }, [getMe]);

  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(setUser(data.user));
      // Redirect to home after successful login
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 500);
    }
  }, [isSuccess, data, dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Logging you in...</p>
      </div>
    </div>
  );
};

export default AuthSuccess;
