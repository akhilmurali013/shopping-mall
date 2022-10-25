import { ComboOffersFormValue } from "../components/combo-offers-form";
import { ComboRequestType } from "../hooks/create-combo";

export default (v: ComboOffersFormValue): ComboRequestType => ({
  comboName: v.comboName,
  comboImageUrl: v.comboImage?.url ?? "",
  comboDescription: v.description,
  price: 100,
  bestSeller: false,
  comboCategories: v.comboCategories?.map((combo) => ({
    comboCategoryName: combo?.comboCategoryName ?? "",
    items: combo?.items?.map((item) => ({
      restaurantId: item.restaurantId,
      dishId: item.dishId,
      dishVariantId: item.dishVariantId,
    })),
  })),
});
