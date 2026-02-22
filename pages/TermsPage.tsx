import React, { useEffect } from 'react';

const TermsPage: React.FC = () => {
  useEffect(() => {
    window.location.replace(`${import.meta.env.BASE_URL}terms.html`);
  }, []);

  return null;
};

export default TermsPage;
