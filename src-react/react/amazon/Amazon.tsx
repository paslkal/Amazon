import Header from "../shared/Header";
import ProductsGrid from './ProductsGrid';
import RenderPage from '../shared/RenderPage';
import '../../../styles-sass/shared/general.scss'
import '../../../styles-sass/pages/amazon.scss'


function Amazon() {
  return (
    <>
      <Header />
      <ProductsGrid />
    </>
  );
}

RenderPage(<Amazon/>)