import { useNavigate } from "react-router-dom";

import routes from "restaurants/routes";

const useRouteToRestaurantRoot = () => {
  const navigate = useNavigate();

  const routeToRestaurantRoot = () => {
    navigate(`/a/${routes.root}`, { replace: true });
  };

  return routeToRestaurantRoot;
};

export default useRouteToRestaurantRoot;
