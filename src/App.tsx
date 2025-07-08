import React, { useState, useEffect } from 'react';
import './App.css';
import MobileAppWrapper from './components/MobileAppWrapper';
import StartPage from './pages/StartPage';
import QuestionPage from './pages/QuestionPage';
import ResultPage from './pages/ResultPage';
import AdPage from './pages/AdPage';
import { lovebugData, LovebugType } from './data/mbti';


type GameState = 'start' | 'playing' | 'ad' | 'result';

function App() {
  
  const [gameState, setGameState] = useState<GameState>(() => {
    const savedGameState = sessionStorage.getItem('gameState');
    return (savedGameState ? JSON.parse(savedGameState) : 'start') as GameState;
  });
  const [answers, setAnswers] = useState<string[]>(() => {
    const savedAnswers = sessionStorage.getItem('answers');
    return savedAnswers ? JSON.parse(savedAnswers) : [];
  });
  const [result, setResult] = useState<LovebugType | null>(() => {
    const savedResult = sessionStorage.getItem('result');
    return savedResult ? JSON.parse(savedResult) : null;
  });

  useEffect(() => {
    sessionStorage.setItem('gameState', JSON.stringify(gameState));
  }, [gameState]);

  useEffect(() => {
    sessionStorage.setItem('answers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    if (result) {
      sessionStorage.setItem('result', JSON.stringify(result));
    } else {
      sessionStorage.removeItem('result');
    }
  }, [result]);

  const handleStart = () => {
    setAnswers([]);
    setResult(null);
    setGameState('playing');
  };

  const handleAnswer = (answerType: string) => {
    const newAnswers = [...answers, answerType];
    setAnswers(newAnswers);

    if (newAnswers.length === lovebugData.questions.length) {
      calculateResult(newAnswers);
      setGameState('ad'); // Transition to ad state
    } 
  };

  const handleAdComplete = () => {
    setGameState('result');
  };

  const handleRestart = () => {
    setGameState('start');
    setAnswers([]);
    setResult(null);
  };

  const calculateResult = (currentAnswers: string[]) => {
    const counts = {
      E: 0,
      I: 0,
      N: 0,
      S: 0,
      T: 0,
      F: 0,
      P: 0,
      J: 0,
    };

    currentAnswers.forEach((answer) => {
      counts[answer as keyof typeof counts]++;
    });

    let finalResult = '';
    finalResult += counts.E > counts.I ? 'E' : 'I';
    finalResult += counts.N > counts.S ? 'N' : 'S';
    finalResult += counts.T > counts.F ? 'T' : 'F';
    finalResult += counts.P > counts.J ? 'P' : 'J';

    setResult(finalResult as LovebugType);
  };

  const renderPage = () => {
    switch (gameState) {
      case 'start':
        return <StartPage onStart={handleStart} />;
      case 'playing':
        return <QuestionPage questionIndex={answers.length} onAnswer={handleAnswer} />;
      case 'ad':
        return <AdPage onAdComplete={handleAdComplete} />;
      case 'result':
        return result ? <ResultPage result={result} onRestart={handleRestart} /> : null;
      default:
        return null;
    }
  };

  return (
    <MobileAppWrapper>
      {renderPage()}
    </MobileAppWrapper>
  );
}

export default App;
