// src/components/DynamicForm/DynamicForm.jsx
import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import QuestionStep from './QuestionStep';
import './DynamicForm.css';

const DynamicForm = ({ questions, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const totalSteps = questions.length;
  const currentQuestion = questions[currentStep];

  const handleAnswerChange = (value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Format the output as requested:
    // [ { question, id, answer: (string or object) } ]
    const formattedOutput = questions.map(q => ({
      question: q.question,
      id: q.id,
      answer: answers[q.id]
    }));
    
    onSubmit(formattedOutput);
  };

  const isLastStep = currentStep === totalSteps - 1;
  const hasAnswer = answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== '';

  return (
    <div className="df-container">
      <ProgressBar current={currentStep + 1} total={totalSteps} />
      
      <QuestionStep 
        key={currentQuestion.id} // Key ensures component remounts for animation
        question={currentQuestion}
        value={answers[currentQuestion.id]}
        onChange={handleAnswerChange}
      />

      <div className="df-controls">
        <button 
          className="df-btn df-btn-secondary" 
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Back
        </button>
        
        {isLastStep ? (
          <button 
            className="df-btn df-btn-primary" 
            onClick={handleSubmit}
            disabled={!hasAnswer}
          >
            Submit
          </button>
        ) : (
          <button 
            className="df-btn df-btn-primary" 
            onClick={handleNext}
            disabled={!hasAnswer}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default DynamicForm;
