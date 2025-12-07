// src/components/DynamicForm/QuestionStep.jsx
import React from 'react';
import './DynamicForm.css';

const QuestionStep = ({ question, value, onChange }) => {
  const isMCQ = Array.isArray(question.mcq) && question.mcq.length > 0;

  return (
    <div className="df-step">
      <h2 className="df-question-title">{question.question}</h2>
      
      <div className="df-input-group">
        {isMCQ ? (
          <div className="df-mcq-grid">
            {question.mcq.map((option, index) => (
              <label 
                key={index} 
                className={`df-mcq-option ${value?.index === index ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={index}
                  checked={value?.index === index}
                  onChange={() => onChange({ index, answer: option })}
                  className="df-mcq-radio"
                />
                <span className="df-mcq-text">{option}</span>
              </label>
            ))}
          </div>
        ) : (
          <input
            type="text"
            className="df-text-input"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type your answer here..."
            autoFocus
          />
        )}
      </div>
    </div>
  );
};

export default QuestionStep;
