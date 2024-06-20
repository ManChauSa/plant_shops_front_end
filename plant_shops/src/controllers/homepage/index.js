import React from "react";
import { ProductCollection } from "./components";
import "./index.css"
export const HomePage = () => {

    return (
        <>
            <ProductCollection title={"NEW ARRIVALS"} apiPath={"product/newarrival"} />
            <ProductCollection title={"SALE"} apiPath={"product/sale"} />
            <ProductCollection title={"TRENDING"} apiPath={"product/trending"} />
        </>
    )

}