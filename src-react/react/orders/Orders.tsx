import { useEffect } from "react";
import updateCartQuantity from "../../scripts/utils/updateCartQuantity";
import RenderPage from "../shared/RenderPage";

function Orders() {
  useEffect(() => {
    updateCartQuantity()
  }, [])

  return (
    <>
    
    </>
  )
}

RenderPage(<Orders/>)