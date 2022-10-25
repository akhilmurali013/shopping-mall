import { useNavigate } from "react-router-dom";

import routes from "restaurants/combo-offers/routes";
import { root } from "restaurants/config";

const useRouteToComboRoot = () => {
  const navigate = useNavigate();

  const routeToRestaurantRoot = () => {
    navigate(`/a/${root}/${routes.root}`, { replace: true });
  };

  return routeToRestaurantRoot;
};

export default useRouteToComboRoot;
