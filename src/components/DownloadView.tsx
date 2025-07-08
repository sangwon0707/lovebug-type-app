import React from 'react';
import { useTranslation } from 'react-i18next';
import { lovebugData, LovebugType, mbtiImageMap } from '../data/mbti';

const images = import.meta.glob('../assets/images/*.png', { eager: true, as: 'url' });

interface DownloadViewProps {
  result: LovebugType;
}

const getMbtiImagePath = (mbtiType: LovebugType) => {
  const imageNumber = mbtiImageMap[mbtiType];
  const imagePath = `../assets/images/${imageNumber}.png`;
  const imageUrl = images[imagePath];
  if (!imageUrl) {
    console.error(`Image for ${mbtiType} (${imagePath}) not found.`);
    return null; // Or a placeholder image
  }
  return imageUrl;
};

const DownloadView = React.forwardRef<HTMLDivElement, DownloadViewProps>(
  ({ result }, ref) => {
    const { t } = useTranslation();
    const resultData = lovebugData.results[result];
    const mbtiImage = getMbtiImagePath(result);

    return (
      <div
        ref={ref}
        className="w-[400px] p-6 bg-white rounded-2xl shadow-lg border-2 border-purple-500"
      >
        {/* Header Section */}
        <div className="p-4 text-center">
          <h2 className="text-gray-800 text-xl font-bold leading-tight">
            {t(`lovebugData.lovebugTypes.${result}.pie`)}
          </h2>
        </div>

        {/* Image Section */}
        <div className="flex flex-col items-center justify-center my-2.5">
          <img 
            src={mbtiImage || ''} 
            alt={result}
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-200 mb-4"
          />
        </div>

        <div className="px-4 pb-4">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
            <p className="text-gray-700 text-center leading-relaxed text-sm"
               dangerouslySetInnerHTML={{ __html: t(`lovebugData.lovebugTypes.${result}.description`) }}
            ></p>
          </div>

          {/* Compatibility Section */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
              <div className="text-green-600 text-sm font-bold">{t('resultPage.goodMatch')}</div>
              <div className="text-gray-600 text-xs">
                {resultData.compatibility.best.map((type) => t(`lovebugData.lovebugTypes.${type as LovebugType}.pie`)).join(', ')}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
              <div className="text-red-600 text-sm font-bold">{t('resultPage.badMatch')}</div>
              <div className="text-gray-600 text-xs">
                {resultData.compatibility.worst.map((type) => t(`lovebugData.lovebugTypes.${type as LovebugType}.pie`)).join(', ')}
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <div className="font-bold text-gray-800">{t('resultPage.LoveInstinct')}</div>
            <div className="text-yellow-400 text-lg">
              {'★'.repeat(t(`lovebugData.lovebugTypes.${result}.LoveInstinct`).length)}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default DownloadView;