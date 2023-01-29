import React from "react";
import { ContainerImage, PriceTitle, Style, TitleItem } from "./styles";
export const ItemResult = ({
  price = "",
  title = "",
  place = "",
  photo = "",
}) => (
  <Style>
    <div className="row">
      <div className="col-2">
        <ContainerImage src={photo} className="img-fluid" alt="..." />
      </div>
      <div className="col-10">
        <div className="card-body">
          <div className="row">
            <div className="col-9">
              <PriceTitle className="card-title">$ {price}</PriceTitle>
            </div>
            <div className="col-3">
              <p className="card-text">
                <small className="text-muted">{place}</small>
              </p>
            </div>
          </div>
          <TitleItem>{title}</TitleItem>
        </div>
      </div>
    </div>
  </Style>
);
