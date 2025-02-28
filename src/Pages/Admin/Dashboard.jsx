import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

const Dashboard = () => {
  const { currentuser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentuser || !currentuser.isAdmin) {
      navigate('/'); // Redirect unauthorized users
    }
  }, [currentuser, navigate]);

  return (
    <div className="float-left  lg:float-none pl-[15px] p-[15px] lg:pl-[293px] w-[100%] lg:p-[25px] bg-[#000] text-white">
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin!</p>
    </div>
  );
};

export default Dashboard;
