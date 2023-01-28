import React from "react";
import { SearchResult } from "../SearchResult";
import { Navbar } from "../Navbar";
import { Breadcrumbs } from "../Breadcumbs";
import {
  ContainerImage,
  BuyButton,
  TitleDetails,
  TextDescription,
  SalesText,
  PriceInfo,
} from "./styles";

export const ItemDetails = () => {
  const image =
    "https://http2.mlstatic.com/D_NQ_NP_651710-MLM51559386433_092022-V.webp";
  return (
    <div className="row">
      <div className="col-9">
        <ContainerImage
          src={image}
          className="rounded mx-auto d-block img-fluid"
          alt="..."
        />
        <TitleDetails>Descripción del producto</TitleDetails>
        <TextDescription>
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y
          archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de
          las industrias desde el año 1500, cuando un impresor (N. del T.
          persona que se dedica a la imprenta) desconocido usó una galería de
          textos y los mezcló de tal manera que logró hacer un libro de textos
          especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como
          texto de relleno en documentos electrónicos, quedando esencialmente
          igual al original. Fue popularizado en los 60s con la creación de las
          hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más
          recientemente con software de autoedición, como por ejemplo Aldus
          PageMaker, el cual incluye versiones de Lorem Ipsum.
        </TextDescription>
      </div>
      <div className="col-3">
        <div className="card-body">
          <div className="row">
            <div className="col-10">
              <SalesText>Nuevo - 234 vendidos</SalesText>
              <h4>Deco Reverse sombrero oxford</h4>
              <PriceInfo>$ 1.980</PriceInfo>
              <BuyButton className="btn btn-primary col-12">Comprar</BuyButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
