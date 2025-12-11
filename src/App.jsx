import { useState, useEffect } from 'react'
import DynamicForm from './components/DynamicForm/DynamicForm'
import './App.css'
import * as XLSX from "xlsx";

export const exportAllSubmissionsToExcel = () => {
  const submissions = JSON.parse(localStorage.getItem("allSubmissions") || "[]");

  if (submissions.length === 0) return;

  // all questions (from the first submission)
  const questions = submissions[0].answers.map(q => ({
    id: q.id,
    question: q.question
  }));

  // build rows
  const rows = submissions.map(sub => {
    const row = {
      submission_id: sub.id,
      timestamp: sub.timestamp
    };

    sub.answers.forEach(ans => {
      const colName = ans.question; // question text becomes column name
      row[colName] =
        typeof ans.answer === "object" ? ans.answer.answer : ans.answer;
    });

    row['score'] = sub.answers.reduce((acc, ans) => acc + (ans.score || 0), 0);

    return row;
  });

  // convert to sheet
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");

  XLSX.writeFile(workbook, "all_users.xlsx");
};


const saveSubmission = (answers) => {
  const existing = JSON.parse(localStorage.getItem("allSubmissions") || "[]");

  existing.push({
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    answers
  });

  localStorage.setItem("allSubmissions", JSON.stringify(existing));
};




const dummyQuestions = [
  {
    id: 'q1',
    question: 'What is your name?',
    correctAnswer: 'John',
    score: 1
    // No mcq attribute -> Text input
  },
  {
    id: 'q2',
    question: 'Which of the following is a Javascript framework?',
    mcq: ['Laravel', 'React', 'Django', 'Flask'],
    correctAnswer: 'React',
    score: 2
  },
  {
    id: 'q3',
    question: 'Describe your coding experience.',
    correctAnswer: 'High',
    score: 1
    // No mcq attribute -> Text input
  },
  {
    id: 'q4',
    question: 'What is your preferred state management tool?',
    mcq: ['Redux', 'Zustand', 'Context API', 'Recoil'],
    correctAnswer: 'Redux',
    score: 2
  },
  {
    id: 'q5',
    question: 'question 5',
    mcq: ['Redux', 'Zustand', 'Context API', 'Recoil'],
    correctAnswer: 'Zustand',
    score: 22
  },
  {
    id: 'q6',
    question: 'question 6',
    mcq: ['Redux', 'Zustand', 'Context API', 'Recoil'],
    correctAnswer: 'Context API',
    score: 2
  }
];

function App() {
  const [submittedData, setSubmittedData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [score, setScore] = useState(0);
  const [totalPossibleScore, setTotalPossibleScore] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdmin(true);
    }
    
    // Calculate total possible score
    const total = dummyQuestions.reduce((acc, curr) => acc + (curr.score || 0), 0);
    setTotalPossibleScore(total);
  }, []);

  const calculateScore = (data) => {
    let currentScore = 0;
    data.forEach(submission => {
      const questionConfig = dummyQuestions.find(q => q.id === submission.id);
      if (questionConfig && questionConfig.correctAnswer) {

        if ((submission.answer.answer||submission.answer) === questionConfig.correctAnswer) {
          currentScore += (questionConfig.score || 0);
        }
      }
    });
    return currentScore;
  };

  const handleFormSubmit = (data) => {
    console.log('Form Submitted:', data);
    const calculatedScore = calculateScore(data);
    setScore(calculatedScore);
    setSubmittedData(data);
    
    // Save submission with score
    saveSubmission(data.map(item => ({...item, score: calculateScore([item])}))); 
    // Note: The saveSubmission logic in the user code seemed to just take 'submission', 
    // but typically you might want to save the total score too. 
    // For now I'll just follow the existing pattern but update local state.
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
      {isAdmin && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'white',
          padding: '1rem',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Admin Panel</h3>
          <button
            onClick={exportAllSubmissionsToExcel}
            style={{
              padding: '0.5rem 1rem',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Export to Excel
          </button>
        </div>
      )}
      <div style={{ width: '100%', maxWidth: '600px', marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
        <div style={{ 
          background: 'rgba(255,255,255,0.7)', 
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
          <img src="/giza-systems-new-logo.png" alt="Giza Systems Logo" style={{ height: '96px'}} />
          {/* <span>GS Quiz</span> */}
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
          <div style={{ 
              marginBottom: '1rem', 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              color: '#333' 
            }}>
            Your Score: <span style={{ color: '#28a745' }}>{score}</span> / {totalPossibleScore}
          </div>
          {/* <pre style={{ 
            background: '#f8f8f8', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            overflowX: 'auto',
            color: '#333'
          }}>
            {JSON.stringify(submittedData, null, 2)}
          </pre> */}
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
