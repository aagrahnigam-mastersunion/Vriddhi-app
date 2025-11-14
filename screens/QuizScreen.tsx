import React, { useState } from 'react';
import { MOCK_QUIZZES } from '../constants';

interface QuizScreenProps {
  onQuizComplete: (score: number) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ onQuizComplete }) => {
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  if (selectedQuiz === null) {
    return (
      <div className="h-full overflow-y-auto pb-20">
        <div className="p-4 bg-orange-500 text-white">
          <h1 className="text-2xl font-bold">खेल</h1>
        </div>
        <div className="space-y-3 p-4">
          {MOCK_QUIZZES.map(quiz => (
            <button
              key={quiz.id}
              onClick={() => setSelectedQuiz(quiz.id)}
              className="w-full bg-white rounded-lg p-4 shadow hover:shadow-lg transition-shadow text-left"
            >
              <h3 className="font-bold text-sm">{quiz.title}</h3>
              <p className="text-xs text-gray-600 mt-1">🎯 {quiz.questions.length} प्रश्न</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const quiz = MOCK_QUIZZES.find(q => q.id === selectedQuiz);
  if (!quiz) return null;

  const question = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    if (answerIndex === question.correctAnswerIndex) {
      setScore(score + 10);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onQuizComplete(score + (selectedAnswer === question.correctAnswerIndex ? 10 : 0));
      setSelectedQuiz(null);
      setCurrentQuestion(0);
      setScore(0);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    }
  };

  return (
    <div className="h-full flex flex-col pb-20">
      <div className="bg-orange-500 text-white p-4">
        <h2 className="font-bold text-sm mb-2">{quiz.title}</h2>
        <div className="flex justify-between text-xs">
          <span>प्रश्न {currentQuestion + 1}/{quiz.questions.length}</span>
          <span>स्कोर: {score}</span>
        </div>
        <div className="w-full bg-orange-400 rounded-full h-2 mt-2">
          <div
            className="bg-white h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="font-bold text-sm mb-4">{question.text}</h3>
        <div className="space-y-2">
          {question.options.map((option, index) => {
            const isCorrect = index === question.correctAnswerIndex;
            const isSelected = index === selectedAnswer;

            let bgColor = 'bg-white hover:bg-gray-50';
            if (answered) {
              if (isCorrect) bgColor = 'bg-green-100';
              else if (isSelected && !isCorrect) bgColor = 'bg-red-100';
            }

            return (
              <button
                key={index}
                onClick={() => !answered && handleAnswer(index)}
                disabled={answered}
                className={`w-full p-3 rounded-lg border-2 border-gray-200 text-left text-sm transition-colors ${bgColor} ${
                  answered ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <span className="font-semibold">{String.fromCharCode(65 + index)}.</span> {option}
              </button>
            );
          })}
        </div>
      </div>

      {answered && (
        <div className="p-4 border-t">
          <button
            onClick={handleNext}
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            {isLastQuestion ? '✓ पूरा करें' : 'अगला →'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizScreen;
