import { useContext } from "react";

import CarritoContext from "@/context/CarritoProvider";

export default function useCarrito() {

    return useContext(CarritoContext)
}