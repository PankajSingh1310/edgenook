import { useUser } from '@/context/user.context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from './ui/button';

const LogoutButton = ({onLogout}) => {
  const { setUserData, setIsLoggedIn } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");
      setUserData(null);
      setIsLoggedIn(false);
      onLogout?.();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);

      localStorage.removeItem("token");
      setUserData(null);
      setIsLoggedIn(false);
      onLogout?.();
      navigate("/login");
    }
  };

  return (
    <Button variant="outline" onClick={handleLogout} className="cursor-pointer">
      Logout
    </Button>
  );
};

export default LogoutButton;
