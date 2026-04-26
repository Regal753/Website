import React, { useLayoutEffect } from 'react';
import LegalRedirect from '../components/LegalRedirect';

const PrivacyPage: React.FC = () => {
  const target = `${import.meta.env.BASE_URL}privacy.html`;

  useLayoutEffect(() => {
    window.location.replace(target);
  }, [target]);

  return <LegalRedirect title="プライバシーポリシー" target={target} />;
};

export default PrivacyPage;
