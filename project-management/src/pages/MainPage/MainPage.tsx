import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

function MainPage() {
  const { t } = useTranslation();
  return (
    <div>
      <h2>Main Page</h2>
      <p>{t('description:part1')}</p>
      <p>
        <Trans i18nKey="description:part2" />
      </p>
    </div>
  );
}

export default MainPage;
