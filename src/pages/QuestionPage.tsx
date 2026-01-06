import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Card, CardHeader, CardContent } from '../components/Card';
import { Progress } from '../components/Progress';
import { questionnaire } from '../data/questions';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface QuestionPageProps {
  onAnswersChange: (answers: {
    net_worth: string;
    primary_goal: string;
    payment_preference: string;
    experience_level: string;
    special_circumstances: string[];
  }) => void;
  onNext: () => void;
}

export const QuestionPage: React.FC<QuestionPageProps> = ({ onAnswersChange, onNext }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({
    net_worth: '',
    primary_goal: '',
    payment_preference: '',
    experience_level: '',
    special_circumstances: [],
  });

  const question = questionnaire[currentQuestion];
  const isMultiSelect = question.type === 'multi';
  const currentAnswer = answers[question.id];
  const isAnswered = isMultiSelect
    ? Array.isArray(currentAnswer) && currentAnswer.length > 0
    : Boolean(currentAnswer);

  const handleSingleSelect = (optionId: string) => {
    const newAnswers = {
      ...answers,
      [question.id]: optionId,
    };
    setAnswers(newAnswers);
  };

  const handleMultiSelect = (optionId: string) => {
    const current = Array.isArray(currentAnswer) ? currentAnswer : [];
    const newAnswer = current.includes(optionId)
      ? current.filter((id) => id !== optionId)
      : [...current, optionId];
    setAnswers({
      ...answers,
      [question.id]: newAnswer,
    });
  };

  const handleNext = () => {
    if (currentQuestion === questionnaire.length - 1) {
      onAnswersChange({
        net_worth: answers.net_worth as string,
        primary_goal: answers.primary_goal as string,
        payment_preference: answers.payment_preference as string,
        experience_level: answers.experience_level as string,
        special_circumstances: answers.special_circumstances as string[],
      });
      onNext();
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const isLastQuestion = currentQuestion === questionnaire.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-navy-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Progress current={currentQuestion + 1} total={questionnaire.length} label="Question Progress" />
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900">{question.question}</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-8">
              {question.options.map((option) => {
                const isSelected = isMultiSelect
                  ? (Array.isArray(currentAnswer) ? currentAnswer : []).includes(option.id)
                  : currentAnswer === option.id;

                return (
                  <label
                    key={option.id}
                    className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      isSelected
                        ? 'border-navy-700 bg-navy-50'
                        : 'border-slate-200 bg-white hover:border-navy-300'
                    }`}
                  >
                    <input
                      type={isMultiSelect ? 'checkbox' : 'radio'}
                      name={question.id}
                      value={option.id}
                      checked={isSelected}
                      onChange={() => (isMultiSelect ? handleMultiSelect(option.id) : handleSingleSelect(option.id))}
                      className="w-5 h-5 mt-1 flex-shrink-0 accent-navy-700 cursor-pointer"
                    />
                    <div className="ml-3 flex-1">
                      <p className="font-semibold text-navy-900">{option.label}</p>
                      {option.description && <p className="text-sm text-slate-600 mt-1">{option.description}</p>}
                    </div>
                  </label>
                );
              })}
            </div>

            <div className={`flex gap-3 ${currentQuestion === 0 ? 'justify-end' : 'justify-between'}`}>
              {currentQuestion > 0 && (
              <Button
                onClick={handlePrevious}
                variant="secondary"
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={!isAnswered}
                className="flex items-center gap-2"
              >
                {isLastQuestion ? 'See Results' : 'Next'}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-slate-500">
            Question {currentQuestion + 1} of {questionnaire.length}
          </p>
        </div>
      </div>
    </div>
  );
};
