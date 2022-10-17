import React from "react";

// import { promotedSectionsMap } from '../../../promoted-content-sections';
import Card, { CardProps } from "../card";

const TryItOut: React.FC<CardProps> = ({ header, description, id }) => (
  <Card header={header} description={description} id={id}>
    TryItOut
  </Card>
);

export default TryItOut;
