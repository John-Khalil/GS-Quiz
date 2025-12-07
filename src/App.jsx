import { useState } from 'react'
import DynamicForm from './components/DynamicForm/DynamicForm'
import './App.css'

const dummyQuestions = [
  {
    id: 'q1',
    question: 'What is your name?',
    // No mcq attribute -> Text input
  },
  {
    id: 'q2',
    question: 'Which of the following is a Javascript framework?',
    mcq: ['Laravel', 'React', 'Django', 'Flask']
  },
  {
    id: 'q3',
    question: 'Describe your coding experience.',
    // No mcq attribute -> Text input
  },
  {
    id: 'q4',
    question: 'What is your preferred state management tool?',
    mcq: ['Redux', 'Zustand', 'Context API', 'Recoil']
  }
];

function App() {
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmit = (data) => {
    console.log('Form Submitted:', data);
    setSubmittedData(data);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', background: '#f0f2f5' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
        Dynamic Form Demo
      </h1>
      
      {!submittedData ? (
        <DynamicForm 
          questions={dummyQuestions} 
          onSubmit={handleFormSubmit} 
        />
      ) : (
        <div style={{ 
          maxWidth: '600px', 
          margin: '0 auto', 
          padding: '2rem', 
          background: 'white', 
          borderRadius: '1rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
        }}>
          <h2 style={{ color: 'green', marginBottom: '1rem' }}>Submission Successful!</h2>
          <pre style={{ 
            background: '#f8f8f8', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            overflowX: 'auto' 
          }}>
            {JSON.stringify(submittedData, null, 2)}
          </pre>
          <button 
            onClick={() => setSubmittedData(null)}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              background: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  )
}

export default App
