import React, { useState,useEffect} from 'react';
import styled from 'styled-components';


import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import Spinner from '../src/components/Spinner';

const LoadingWidget =()=>{
return(
  <Widget>
    <Widget.Header>
    </Widget.Header>
    <Widget.Content>
      <Spinner description='Carregando...' />
    </Widget.Content>    
  </Widget>
)    
}

const QuestionWidget =({question,totalQuestions,questionIndex,onSubmit})=>{
  const questionId = `question__${questionIndex}`;

  const handleFormSubmit=(event)=>{
    event.preventDefault();
    onSubmit();
  }
  return(
    <Widget>
    <Widget.Header>
      <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
    </Widget.Header>
    <img
    alt="Descrição"
    style={{
      width: '100%',
      height: '150px',
      objectFit: 'cover',
    }}
    src={question.image}
  />
    <Widget.Content>
    <h2>
      {question.title}
    </h2>
    <p>
      {question.description}
    </p>
    <form onSubmit={handleFormSubmit}>
      {question.alternatives.map((alternative,alternativeIndex)=>{
          const alternativeId = `alternative__${alternativeIndex}`
          console.log(alternative);
          console.log(alternativeIndex);
        return(
          <Widget.Topic htmlFor={alternativeIndex} as='label'>
            <input id={alternativeId}  name={questionId} type="radio"/>
            {alternative}
          </Widget.Topic>
        )
      })}
    </form>
    <Button type="submit">
        Confirmar
      </Button>
    </Widget.Content>
  </Widget>
  );
}


export default function QuizPage() {
  const screenStates ={
    QUIZ:'QUIZ',
    LOADING:'LOADING',
    RESULT:'RESULT'
  };
  const totalQuestions = db.questions.length;
  const [currentQuestion,setCurrentQuestion] = useState('0');
  const questionIndex = currentQuestion;
  const [screenState,setScreenState] = useState(screenStates.LOADING);
  const question = db.questions[questionIndex];

  useEffect(()=>{
    setTimeout(()=>{
      setScreenState(screenStates.QUIZ)
    },2 * 1000);
  },[]);
 const handleQuizSubmit =()=>{
   const  nextQuestion = questionIndex + 1;
   if(nextQuestion < totalQuestions){
     setCurrentQuestion(nextQuestion);
   } else{
     setScreenState(screenStates.RESULT);
   }
 }
return (
  <QuizBackground backgroundImage={db.bg}>
    <QuizContainer>
      <QuizLogo />
     {screenState === screenStates.QUIZ && (
       <QuestionWidget 
       question={question} 
       totalQuestions={totalQuestions} 
       questionIndex={questionIndex}
       onSubmit = {handleQuizSubmit}/>
     )}
     {screenState === screenStates. LOADING &&  <LoadingWidget/>}
     {screenState === screenStates.RESULT && <div>Parabéns! Você acertou X questões.</div>}
    </QuizContainer>
  </QuizBackground>
);
}