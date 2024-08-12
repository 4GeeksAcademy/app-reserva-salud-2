import React from 'react';
import { InlineWidget } from 'react-calendly';

export const Calendly = () => {

  const ejemplo = {
    urlCalendly: "https://calendly.com/victoriamartinezruiz23/consulta"
  };

  return (
    <div>
      <div style={{ height: '630px', marginBottom: '20px' }}>
        <InlineWidget url={ejemplo.urlCalendly} />
      </div>
    </div>
  );
};