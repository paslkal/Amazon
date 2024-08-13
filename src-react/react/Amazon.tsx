import { useEffect } from 'react';
import ReactDOM from 'react-dom/client'; 
import Header from "./Header";
import { ProductsGrid } from "./ProductsGrid";
import updateCartQuantity from '../scripts/utils/updateCartQuantity';
import '../../styles-sass/shared/general.scss'
import '../../styles-sass/shared/amazon-header.scss'
import '../../styles-sass/pages/amazon.scss'


function Amazon() {
  useEffect(() => {
    updateCartQuantity()
  }, [])
  return (
    <>
      <Header />
      <ProductsGrid />
    </>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<Amazon />);
}
