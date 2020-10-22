import React from "react";

const Phone = ({ content }) => {
  return (
    <a class="no-tracking-phone-click" href={"tel:"+content}><span itemprop="telephone" class="tracking-phone">{content}</span></a>
  );
};

export default Phone;