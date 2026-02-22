import React, { useEffect } from 'react';

const PrivacyPage: React.FC = () => {
  useEffect(() => {
    window.location.replace(`${import.meta.env.BASE_URL}privacy.html`);
  }, []);

  return null;
};

export default PrivacyPage;
