import ReactDOM from "react-dom/client";

function RenderPage(Page: JSX.Element) {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(Page);
  }
}

export default RenderPage