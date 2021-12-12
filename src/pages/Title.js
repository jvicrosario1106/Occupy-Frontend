import React from "react";
import { Helmet } from "react-helmet";
const Title = ({ title }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
    </div>
  );
};

export default Title;
