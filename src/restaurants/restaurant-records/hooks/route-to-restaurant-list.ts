import { useNavigate } from "react-router-dom";

import { root } from "restaurants/config";
import routes from "restaurants/restaurant-records/routes";

const useRouteToRestaurantRoot = () => {
  const navigate = useNavigate();

  const routeToRestaurantRoot = () => {
    navigate(`/a/${root}/${routes.root}`, { replace: true });
  };

  return routeToRestaurantRoot;
};

export default useRouteToRestaurantRoot;
