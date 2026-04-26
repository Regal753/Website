import React, { useEffect } from 'react';
import LegalRedirect from '../components/LegalRedirect';

const PrivacyPage: React.FC = () => {
  const target = `${import.meta.env.BASE_URL}privacy.html`;

  useEffect(() => {
    window.location.replace(target);
  }, [target]);

  return <LegalRedirect title="プライバシーポリシー" target={target} />;
};

export default PrivacyPage;
