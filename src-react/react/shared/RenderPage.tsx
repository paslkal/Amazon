import ReactDOM from "react-dom/client";

export default function RenderPage(Page: JSX.Element) {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(Page);
  }
}

export function RenderComponentById(Page: JSX.Element, id: string) {
  const element = document.getElementById(id);
  if (element) {
    const root = ReactDOM.createRoot(element);
    root.render(Page);
  }
}
