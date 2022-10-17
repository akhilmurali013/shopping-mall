import React from "react";

import { useNavigate } from "react-router-dom";

import promotedContentRoutes from "stores/promoted-contents/routes";

import "./styles.less";

export type CardProps = {
  header: string;
  description: string;
  id: string;
};

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  id,
  header,
  description,
  children,
}) => {
  const navigate = useNavigate();
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="header">{header}</div>
          <div>{description}</div>
        </div>
        <button
          type="button"
          className="action-button"
          onClick={() =>
            navigate(
              `${promotedContentRoutes.sectionDetails}/${id}/${promotedContentRoutes.edit}`
            )
          }
        >
          Edit
        </button>
      </div>
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;
