import React from "react";

import { CuisineStyle } from "app/types/restaurant";
import cuisineStyleOptions from "restaurants/restaurant-records/services/cuisine-style-options";

import "./styles.less";

const styleMap = cuisineStyleOptions?.reduce((acc, style) => {
  acc[style.value] = style.label;
  return acc;
}, {} as Record<CuisineStyle, string>);

const CategoryPill: React.FC<{
  cuisineStyle?: CuisineStyle;
}> = ({ cuisineStyle }) => {
  if (!cuisineStyle) return null;
  return <span className="styled-pill">{styleMap[cuisineStyle]}</span>;
};

export default CategoryPill;
