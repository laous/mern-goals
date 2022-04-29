import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";
import { getAllGoals } from "../features/goals/goalSlice";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { goals, isError, isLoading, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (!user) navigate("/login");
    if (isError) {
      console.log(message);
    }
    dispatch(getAllGoals());
  }, [user, navigate, isError, message, dispatch]);

  return (
    <section className="heading">
      <h1>Welcome</h1>
      <p>Goals Dashboard</p>
      <GoalForm />
      {isLoading && <Spinner />}
      <section className="content">
        {goals.length > 0 ? (
          goals.map((goal) => <GoalItem goal={goal} key={goal._id} />)
        ) : (
          <h3>You have no goal!</h3>
        )}
      </section>
    </section>
  );
};

export default Dashboard;
