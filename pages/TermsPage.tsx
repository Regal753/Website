import React, { useEffect } from 'react';
import LegalRedirect from '../components/LegalRedirect';

const TermsPage: React.FC = () => {
  const target = `${import.meta.env.BASE_URL}terms.html`;

  useEffect(() => {
    window.location.replace(target);
  }, [target]);

  return <LegalRedirect title="利用規約" target={target} />;
};

export default TermsPage;
