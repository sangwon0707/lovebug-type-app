import React, { useRef, useState, useEffect } from 'react';
import { Download, RotateCcw, Share2, Heart, Sparkles, Star, Zap, Crown, Flame } from 'lucide-react';
import { lovebugData, LovebugType, mbtiImageMap } from '../data/mbti';
import { useTranslation } from 'react-i18next';
import html2canvas from 'html2canvas';

interface ResultPageProps {
  result: LovebugType;
  onRestart: () => void;
}

const getMbtiImagePath = (mbtiType: LovebugType) => {
  const imageNumber = mbtiImageMap[mbtiType];
  try {
    return require(`../assets/images/${imageNumber}.png`);
  } catch (error) {
    console.error(`Image for ${mbtiType} (${imageNumber}.png) not found:`, error);
    return null; // Or a placeholder image
  }
};

const FloatingElement = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <div 
    className={`absolute animate-pulse opacity-30 ${className}`}
    style={{ 
      animationDelay: `${delay}s`,
      animationDuration: '3s'
    }}
  >
    {children}
  </div>
);

const ParticleElement = ({ delay = 0 }: { delay?: number }) => (
  <div 
    className="absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full animate-ping opacity-60"
    style={{ 
      animationDelay: `${delay}s`,
      animationDuration: '2s',
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`
    }}
  />
);

const ResultPage: React.FC<ResultPageProps> = ({ result, onRestart }) => {
  const { t } = useTranslation();
  const resultData = lovebugData.results[result];
  const mbtiImage = getMbtiImagePath(result);

  const [isDownloading, setIsDownloading] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [stars, setStars] = useState<number[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStars(Array.from({ length: 100 }, (_, i) => i));
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);
    if (resultRef.current) {
      html2canvas(resultRef.current, {
        useCORS: true,
        ignoreElements: (element) => {
          return element.id === 'restart-button';
        }
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Lovebug_Result_${result}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
    setIsDownloading(false);
  };

  const handleShare = () => {
    setIsShared(true);
    const shareText = `${t('share.title')} ${t('share.text')}`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: t('share.title'),
        text: shareText,
        url: shareUrl,
      }).finally(() => {
        setIsShared(false);
      });
    } else {
      // Fallback for browsers that do not support the Web Share API
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      let threadsShareUrl = '';

      if (isMobile) {
        threadsShareUrl = `barcelona://create?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
      } else {
        threadsShareUrl = `https://threads.net/intent/post?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
      }
      window.open(threadsShareUrl, '_blank');
      setIsShared(false);
    }
  };

  const handleRestartClick = () => {
    onRestart();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Starry Night Background */}
      <div className="absolute inset-0">
        {/* Nebula-like background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,69,255,0.3)_0%,transparent_50%)] animate-pulse nebula-drift"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(79,70,229,0.2)_0%,transparent_50%)] animate-pulse nebula-drift" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(168,85,247,0.15)_0%,transparent_60%)] animate-pulse nebula-drift" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Twinkling Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none star-field">
        {stars.map((i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full star"
            style={{ 
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 1}s`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              boxShadow: '0 0 6px rgba(255,255,255,0.8)'
            }}
          />
        ))}
      </div>

      {/* Shooting Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 더 많은 유성들 */}
        <div 
          className="absolute w-1 h-1 bg-white rounded-full opacity-80 shooting-star"
          style={{
            top: '20%',
            left: '-10%',
            boxShadow: '0 0 10px rgba(255,255,255,0.8), 2px 0 20px rgba(255,255,255,0.4)'
          }}
        />
        <div 
          className="absolute w-1 h-1 bg-white rounded-full opacity-60 shooting-star"
          style={{
            top: '60%',
            left: '-10%',
            animationDelay: '2s',
            boxShadow: '0 0 8px rgba(255,255,255,0.6), 2px 0 15px rgba(255,255,255,0.3)'
          }}
        />
        <div 
          className="absolute w-1 h-1 bg-white rounded-full opacity-70 shooting-star"
          style={{
            top: '10%',
            left: '-10%',
            animationDelay: '1s',
            boxShadow: '0 0 12px rgba(255,255,255,0.9), 2px 0 25px rgba(255,255,255,0.5)'
          }}
        />
        <div 
          className="absolute w-1 h-1 bg-white rounded-full opacity-50 shooting-star"
          style={{
            top: '80%',
            left: '-10%',
            animationDelay: '3.5s',
            boxShadow: '0 0 6px rgba(255,255,255,0.7), 2px 0 18px rgba(255,255,255,0.4)'
          }}
        />
        <div 
          className="absolute w-1 h-1 bg-white rounded-full opacity-65 shooting-star"
          style={{
            top: '40%',
            left: '-10%',
            animationDelay: '0.5s',
            boxShadow: '0 0 9px rgba(255,255,255,0.8), 2px 0 22px rgba(255,255,255,0.4)'
          }}
        />
        <div 
          className="absolute w-1 h-1 bg-white rounded-full opacity-55 shooting-star"
          style={{
            top: '30%',
            left: '-10%',
            animationDelay: '4s',
            boxShadow: '0 0 7px rgba(255,255,255,0.6), 2px 0 16px rgba(255,255,255,0.3)'
          }}
        />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement delay={0} className="top-[10%] left-[15%] floating">
          <Heart className="w-8 h-8 text-purple-300 drop-shadow-lg" />
        </FloatingElement>
        <FloatingElement delay={1} className="top-[20%] right-[20%] floating">
          <Sparkles className="w-6 h-6 text-indigo-300 drop-shadow-lg" />
        </FloatingElement>
        <FloatingElement delay={2} className="bottom-[30%] left-[10%] floating">
          <Star className="w-7 h-7 text-violet-300 drop-shadow-lg" />
        </FloatingElement>
        <FloatingElement delay={0.5} className="top-[60%] right-[15%] floating">
          <Heart className="w-5 h-5 text-purple-300 drop-shadow-lg" />
        </FloatingElement>
        <FloatingElement delay={1.5} className="bottom-[20%] right-[25%] floating">
          <Sparkles className="w-8 h-8 text-indigo-300 drop-shadow-lg" />
        </FloatingElement>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div 
          ref={resultRef}
          className="w-full max-w-md mx-auto glass-card rounded-3xl shadow-2xl border border-white/30 overflow-hidden"
        >
          <div>
            {/* Header Section */}
            <div className="relative header-gradient p-8 text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700/50 to-indigo-700/50 blur-xl"></div>
              <div className="relative">
                <h2 className="text-white text-2xl font-bold leading-tight drop-shadow-lg">
                  {t(`lovebugData.lovebugTypes.${result}.pie`)}
                </h2>
              </div>
            </div>

            {/* Image Section */}
            <div className="flex flex-col items-center justify-center my-2.5">
              <div className="relative group profile-image-container w-44 h-44 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full blur-2xl opacity-40 scale-125 group-hover:scale-150 transition-transform duration-500"></div>
                <img 
                  src={mbtiImage} 
                  alt={result}
                  className="relative w-44 h-44 rounded-full object-cover border-4 border-white shadow-2xl mt-4 mb-4 profile-image group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="px-6 pb-8">
              <div className="glass-card rounded-2xl p-6 border border-purple-200/50 mb-6 shadow-lg">
                <p className="text-gray-700 text-center leading-relaxed text-sm text-cosmic"
                   dangerouslySetInnerHTML={{ __html: t(`lovebugData.lovebugTypes.${result}.description`) }}
                ></p>
              </div>

              {/* Compatibility Section */}
              <div className="grid grid-cols-3 gap-3 mb-6 items-center">
                <div className="glass-card rounded-xl p-3 text-center border border-purple-200/50 shadow-md compatibility-card min-h-[80px]">
                  <div className="text-purple-600 text-sm font-bold">{t('resultPage.goodMatch')}</div>
                  <div className="text-gray-600 text-xs">
                    {resultData.compatibility.best.map((type) => t(`lovebugData.lovebugTypes.${type as LovebugType}.pie`)).join(', ')}
                  </div>
                </div>
                <div className="glass-card rounded-xl p-3 text-center border border-purple-200/50 shadow-md compatibility-card min-h-[80px]">
                  <div className="text-indigo-600 text-sm font-bold">{t('resultPage.badMatch')}</div>
                  <div className="text-gray-600 text-xs">
                    {resultData.compatibility.worst.map((type) => t(`lovebugData.lovebugTypes.${type as LovebugType}.pie`)).join(', ')}
                  </div>
                </div>
                <div className="glass-card rounded-xl p-3 text-center border border-purple-200/50 shadow-md compatibility-card min-h-[80px]">
                  <div className="text-violet-600 text-sm font-bold">{t('resultPage.heartbeatTemperature')}</div>
                  <div className="text-gray-600 text-xs">
                    {Array(resultData.LoveInstinct.length).fill('★').map((star, index) => (
                      <span key={index} className="text-yellow-400">{star}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex-1 btn-primary text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDownloading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin loading-spinner"></div>
                      <span>{t('resultPage.downloadButton')}...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      <span>{t('resultPage.downloadButton')}</span>
                    </>
                  )}
                </button>
                <button
                  id="restart-button"
                  onClick={handleRestartClick}
                  className="flex-1 btn-secondary text-purple-700 font-semibold py-3 px-4 rounded-2xl border border-purple-200 hover:bg-purple-200/70 transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="text-sm">{t('resultPage.restartButton')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-white/80 text-sm drop-shadow-lg">
            {t('resultPage.shareWithFriendsDescription')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;