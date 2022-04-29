import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);
  return (
    <section className="heading">
      <h1>Welcome</h1>
      <p>Goals Dashboard</p>
      <GoalForm />
    </section>
  );
};

export default Dashboard;
