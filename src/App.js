import './App.css';
import React from 'react';
import Axios from 'axios';

function App() {
  const URL = process.env.REACT_APP_BASE_URL;

  const [questions, setQuestions] = React.useState([]);

  const getData = () => {
    return Axios.get(URL, {
      params: {
        amount: 10,
        category: 9,
        difficulty: "easy",
        type: "multiple",
      },
    });
  }
  React.useEffect(() => {
    getData().then(res => {
      console.table(res.data.results);
      if (res.data.response_code === 0) {
        setQuestions(res.data.results);
      }
    }).catch((err) => console.log(err.message));
  }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', overflowY: 'scroll', width: '100vw' }}>
      <h1>Trivia App</h1>
      <div style={{ width: '75%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '50px'}}>
        {questions.map((question) => {
          return (
            <div style={{ padding: 16 }}>
              <h5>{question.question}</h5>
              <div style={{ padding: 8 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input type="radio"></input>
                  <p style={{ padding: 4 }}>{question.correct_answer}</p>
                </div>
                {question.incorrect_answers.map((answer) => (
                  <div style={{ display: 'flex', alignItems: 'center'}}>
                    <input type="radio"></input>
                    <p style={{ padding: 4 }}>{answer}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
