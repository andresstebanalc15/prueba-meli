import React from "react";
import { ContainerImage, PriceTitle, Style, TitleItem } from "./styles";
import { Link } from "@reach/router";

export const ItemResult = ({
  id = "",
  price = "",
  title = "",
  place = "",
  photo = "",
}) => (
  <Style>
    <div className="row">
      <div className="col-2">
        <Link to={"/items/" + id}>
          <ContainerImage
            src={photo}
            className="rounded mx-auto d-block img-fluid"
            alt="..."
          />
        </Link>
      </div>
      <div className="col-10">
        <div className="card-body">
          <div className="row">
            <div className="col-9">
              <PriceTitle className="card-title">
                $ {price.toLocaleString("es-CO")}
              </PriceTitle>
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
