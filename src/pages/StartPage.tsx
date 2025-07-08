import React from 'react';
import { useTranslation } from 'react-i18next';
import startPageBackground from '../assets/images/start_page_background.png';

interface StartPageProps {
  onStart: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative flex size-full h-full flex-col bg-slate-50 start-page-container overflow-x-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${startPageBackground})` }}
        role="img"
        aria-label="Lovebug Type App 시작 페이지 배경 이미지"
      ></div>
      <div className="absolute inset-0 bg-black opacity-40"></div> {/* Semi-transparent overlay */}
      <div className="relative z-10 flex flex-col h-full start-page-content-wrapper">
        <div className="language-selector-wrapper flex justify-end p-4">
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            value={i18n.language}
            className="appearance-none bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="en">🇺🇸 English</option>
            <option value="ko">🇰🇷 한국어</option>
          </select>
        </div>
        <div className="start-page-hero-section flex flex-col items-center justify-center flex-grow text-white text-center p-4">
          <h2 className="text-5xl font-bold mb-4 drop-shadow-lg">
            {t('startPage.title')}
          </h2>
          <p className="text-xl mb-8 drop-shadow-lg whitespace-pre-wrap">
            {t('startPage.description')}
          </p>
        </div>
        <div className="start-button-wrapper flex px-4 py-3 justify-center">
          <button
            onClick={onStart}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-coral text-[#0c151d] text-base font-bold leading-normal tracking-[0.015em] shadow-lg transform transition-transform hover:scale-105"
          >
            <span className="truncate">{t('startPage.startButton')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
