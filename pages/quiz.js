import React, { useState,useEffect} from 'react';
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
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited,setIsQuestionSubmited] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;

  const handleFormSubmit=(event)=>{
    event.preventDefault();
    onSubmit();
    setIsQuestionSubmited(true);
    
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
    <form onSubmit={handleFormSubmit} >
      {question.alternatives.map((alternative,alternativeIndex)=>{
          const alternativeId = `alternative__${alternativeIndex}`;
          
        return(
          <Widget.Topic htmlFor={alternativeId} as='label' key={alternativeId}>
            <input id={alternativeId}  name={questionId} type="radio" onChange = {()=> setSelectedAlternative(alternativeIndex)}/>
            {alternative}
          </Widget.Topic>
        )
      })}
      <Button type="submit">
        Confirmar
      </Button>
      {isQuestionSubmited && isCorrect && <p>Resposta correta.</p>}
      {isQuestionSubmited && !isCorrect && <p>Resposta incorreta.</p>}
    </form>
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
  const [currentQuestion,setCurrentQuestion] = useState(0);
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