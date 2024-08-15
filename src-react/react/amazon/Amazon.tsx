import AmazonHeader from "../shared/AmazonHeader";
import ProductsGrid from './ProductsGrid';
import RenderPage from '../shared/RenderPage';
import '../../../styles-sass/shared/general.scss'
import '../../../styles-sass/pages/amazon.scss'


function Amazon() {
  return (
    <>
      <AmazonHeader />
      <ProductsGrid />
    </>
  );
}

RenderPage(<Amazon/>)