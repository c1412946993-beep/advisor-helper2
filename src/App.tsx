import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { LandingPage } from './pages/LandingPage';
import { QuestionPage } from './pages/QuestionPage';
import { ResultsPage } from './pages/ResultsPage';
import { generateQuestions, GeneratedQuestion } from './data/questions';
import { saveQuizSubmission, trackAnalytics } from './lib/supabase';

type Step = 'landing' | 'questions' | 'results';

function App() {
  const [step, setStep] = useState<Step>('landing');
  const [answers, setAnswers] = useState({
    net_worth: '',
    primary_goal: '',
    payment_preference: '',
    experience_level: '',
    special_circumstances: [] as string[],
  });
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([]);
  const [sessionId] = useState(() => {
    const stored = sessionStorage.getItem('quiz_session_id');
    if (stored) return stored;
    const newId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('quiz_session_id', newId);
    return newId;
  });

  useEffect(() => {
    trackAnalytics(step).catch(console.error);
  }, [step]);

  const handleStartQuiz = () => {
    setStep('questions');
  };

  const handleAnswersSubmit = (userAnswers: typeof answers) => {
    setAnswers(userAnswers);
    const questions = generateQuestions(userAnswers);
    setGeneratedQuestions(questions);

    saveQuizSubmission(sessionId, userAnswers, questions).catch((error) => {
      console.error('Error saving submission:', error);
    });

    setStep('results');
  };

  const handleRestart = () => {
    setStep('landing');
    setAnswers({
      net_worth: '',
      primary_goal: '',
      payment_preference: '',
      experience_level: '',
      special_circumstances: [],
    });
    setGeneratedQuestions([]);
  };

  return (
    <div className="min-h-screen bg-white">
      {step === 'landing' && <LandingPage onStart={handleStartQuiz} />}
      {step === 'questions' && (
        <QuestionPage onAnswersChange={handleAnswersSubmit} onNext={() => {}} />
      )}
      {step === 'results' && (
        <ResultsPage questions={generatedQuestions} onRestart={handleRestart} />
      )}
      <Analytics />
    </div>
  );
}

export default App;
