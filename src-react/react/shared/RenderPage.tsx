import ReactDOM from "react-dom/client";
import React, { StrictMode } from "react";
import '../../../styles-sass/shared/general.scss'

export default function RenderPage(Page: React.ComponentType) {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <StrictMode>
        <Page/>
      </StrictMode>
    );
  }
}

export function RenderComponentById(Page: React.ComponentType, id: string) {
  const element = document.getElementById(id);
  if (element) {
    const root = ReactDOM.createRoot(element);
    root.render(
      <StrictMode>
        <Page/>
      </StrictMode>
    );
  }
}
