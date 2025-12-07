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
  },
  {
    id: 'q5',
    question: 'What is your preferred state management tool?',
    mcq: ['Redux', 'Zustand', 'Context API', 'Recoil']
  },
  {
    id: 'q6',
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
    <div style={{ 
      minHeight: '100vh', 
      padding: '2rem', 
      background: '#00a8e2',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '600px', marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
        <div style={{ 
          background: 'rgba(255,255,255,0.2)', 
          padding: '1rem 2rem', 
          borderRadius: '1rem', 
          backdropFilter: 'blur(5px)',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          {/* Logo Placeholder */}
          <div style={{ width: '32px', height: '32px', background: 'white', borderRadius: '50%' }}></div>
          <span>GS Quiz</span>
        </div>
      </div>
      
      {!submittedData ? (
        <DynamicForm 
          questions={dummyQuestions} 
          onSubmit={handleFormSubmit} 
        />
      ) : (
        <div style={{ 
          maxWidth: '600px', 
          width: '100%',
          padding: '2rem', 
          background: 'white', 
          borderRadius: '1rem',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)' 
        }}>
          <h2 style={{ color: '#00a8e2', marginBottom: '1rem' }}>Submission Successful!</h2>
          <pre style={{ 
            background: '#f8f8f8', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            overflowX: 'auto',
            color: '#333'
          }}>
            {JSON.stringify(submittedData, null, 2)}
          </pre>
          <button 
            onClick={() => setSubmittedData(null)}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              background: '#00a8e2',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 'bold'
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
