import React, { useState, useEffect } from 'react';
import { lovebugData } from '../data/mbti';
import { useTranslation } from 'react-i18next';
import { Heart, Sparkles, Star, ChevronRight } from 'lucide-react';

interface QuestionPageProps {
  questionIndex: number;
  onAnswer: (answer: string) => void;
}

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

const QuestionPage: React.FC<QuestionPageProps> = ({ questionIndex, onAnswer }) => {
  const { t } = useTranslation();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const question = lovebugData.questions[questionIndex];
  const progress = ((questionIndex + 1) / lovebugData.questions.length) * 100;

  const [stars, setStars] = useState<number[]>([]);

  useEffect(() => {
    setStars(Array.from({ length: 100 }, (_, i) => i));
  }, []);

  const handleNext = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer);
      setSelectedAnswer(null);
    }
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
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow p-4">
        <div className="w-full max-w-md mx-auto glass-card rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          {/* Progress Bar */}
          <div className="p-6 pb-4">
            <div className="w-full bg-white/20 rounded-full h-2.5 mb-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <h2 className="text-white text-center text-lg font-semibold drop-shadow-md">
              {t('questionPage.questionNumber', { current: questionIndex + 1, total: lovebugData.questions.length })}
            </h2>
          </div>

          {/* Question Card */}
          <div className="glass-card rounded-2xl p-6 border border-purple-200/50 mb-6 shadow-lg mx-4">
            <p className="text-5xl text-center mb-4 drop-shadow-md">{question.emoji}</p>
            <p 
              className="text-gray-800 text-center leading-relaxed text-lg font-medium drop-shadow-md"
              dangerouslySetInnerHTML={{ __html: t(`lovebugData.questions.${questionIndex}.question`) }}
            ></p>
          </div>

          {/* Choices Container */}
          <div className="px-6 pb-8 space-y-4">
            <label 
              key={0} 
              className={`glass-card flex items-center p-4 rounded-xl border border-purple-200/50 cursor-pointer shadow-md transition-all duration-200 
                ${selectedAnswer === question.typeMap.choice1 ? 'bg-purple-500/30 border-purple-400 shadow-lg' : 'hover:bg-white/20 hover:border-purple-300'}`}
            >
              <input
                type="radio"
                name="answer"
                value={question.typeMap.choice1}
                checked={selectedAnswer === question.typeMap.choice1}
                onChange={() => setSelectedAnswer(question.typeMap.choice1)}
                className="form-radio h-5 w-5 text-purple-600 border-purple-400 focus:ring-purple-500"
              />
              <span className="ml-4 text-gray-800 text-base font-medium drop-shadow-sm">{t(`lovebugData.questions.${questionIndex}.choices.0.text`)}</span>
            </label>
            <label 
              key={1} 
              className={`glass-card flex items-center p-4 rounded-xl border border-purple-200/50 cursor-pointer shadow-md transition-all duration-200 
                ${selectedAnswer === question.typeMap.choice2 ? 'bg-purple-500/30 border-purple-400 shadow-lg' : 'hover:bg-white/20 hover:border-purple-300'}`}
            >
              <input
                type="radio"
                name="answer"
                value={question.typeMap.choice2}
                checked={selectedAnswer === question.typeMap.choice2}
                onChange={() => setSelectedAnswer(question.typeMap.choice2)}
                className="form-radio h-5 w-5 text-purple-600 border-purple-400 focus:ring-purple-500"
              />
              <span className="ml-4 text-gray-800 text-base font-medium drop-shadow-sm">{t(`lovebugData.questions.${questionIndex}.choices.1.text`)}</span>
            </label>
          </div>

          {/* Next Button */}
          <div className="p-6 pt-0">
            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="w-full btn-primary text-white font-semibold py-4 px-6 rounded-2xl shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{t('questionPage.nextButton')}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;