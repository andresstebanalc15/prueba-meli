import React from "react";

import {
  ContainerImage,
  BuyButton,
  TitleDetails,
  TextDescription,
  SalesText,
  PriceInfo,
} from "./ItemDetails.styles";

export const ItemDetails = ({
  title,
  picture,
  description,
  condition,
  sold_quantity,
  price = {},
}) => {
  return (
    <div className="row">
      <div className="col-9">
        <ContainerImage
          src={picture}
          className="rounded mx-auto d-block img-fluid"
          alt="..."
        />
        <TitleDetails>Descripción del producto</TitleDetails>
        <TextDescription>{description}</TextDescription>
      </div>
      <div className="col-3">
        <div className="card-body">
          <div className="row">
            <div className="col-10">
              <SalesText>
                {condition} {sold_quantity}
                {sold_quantity === 1 ? " vendido" : " vendidos"}
              </SalesText>
              <h4>{title}</h4>
              <PriceInfo>$ {price.amount?.toLocaleString("es-CO")}</PriceInfo>
              <BuyButton className="btn btn-primary col-12">Comprar</BuyButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
