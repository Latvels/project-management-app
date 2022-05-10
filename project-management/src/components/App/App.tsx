import React from 'react';
import './App.css';
import MainRoutes from '../../routes/routes';
import { useTranslation, Trans } from 'react-i18next';
import {availableLanguages} from '../../services/i18n';

export default function App() {
  const { t, i18n  } = useTranslation();

  return (
    <div className="App">
      <select defaultValue={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
          {availableLanguages.map((language) => (
            <option key={language}>{language}</option>
          ))}
        </select>
      <p>
        <Trans i18nKey="description:part1"></Trans>
      </p>
      <p>{t('description:part2')}</p>
      <MainRoutes />
    </div>
  );
};