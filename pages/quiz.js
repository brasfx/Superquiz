import React, { useState,useEffect} from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import Spinner from '../src/components/Spinner';
import AlternativesForm from  '../src/components/AlternativesForm';

const ResultWidget =({results})=>{
  return(
    <Widget>
      <Widget.Header>
        Tela de resultados:
      </Widget.Header>
      <Widget.Content>
      <p>Você acertou {/* {results.reduce((somatorioAtual,resultAtual)=>{
        const isAcerto = resultAtual === true;
        if(isAcerto){
          return somatorioAtual + 1;
        }
        return somatorioAtual;
      },0)} */} 
      {results.filter((x)=>x === true).length}
      {' '}
       pergunta(s)</p>
      <ul>
        {results.map((result,index)=>(
        <li key={`result__${result}`}>
           Questão {index +1}: {' '}
          {result === true ? 'Acertou ' : 'Errou'}
        </li>
        ))} 
      </ul>
      </Widget.Content>    
    </Widget>
  )    
  }

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

const QuestionWidget =({question,totalQuestions,questionIndex,onSubmit,addResult})=>{
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited,setIsQuestionSubmited] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  const handleFormSubmit=(event)=>{
    event.preventDefault();
    setIsQuestionSubmited(true);
    setTimeout(() => {
      addResult(isCorrect);
      onSubmit();
      setIsQuestionSubmited(false);
      setSelectedAlternative(undefined);
    }, 2 * 1000);
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
    <AlternativesForm onSubmit={handleFormSubmit} >
      {question.alternatives.map((alternative,alternativeIndex)=>{
          const alternativeId = `alternative__${alternativeIndex}`;
          const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
          const isSelected = selectedAlternative === alternativeIndex;
          
        return(
          <Widget.Topic htmlFor={alternativeId} as='label' key={alternativeId}  data-selected={isSelected}
          data-status={isQuestionSubmited && alternativeStatus}>
            <input id={alternativeId}  style={{display:'none'}} name={questionId} type="radio" onChange = {()=> setSelectedAlternative(alternativeIndex)}/>
            {alternative}
          </Widget.Topic>
        )
      })}
      <Button type="submit" disabled={!hasAlternativeSelected}>
        Confirmar
      </Button>
      {isQuestionSubmited && isCorrect && <p>Resposta correta.</p>}
      {isQuestionSubmited && !isCorrect && <p>Resposta incorreta.</p>}
    </AlternativesForm>
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
  const [results,setResults] = useState([]);
  const [currentQuestion,setCurrentQuestion] = useState(0);
  const [screenState,setScreenState] = useState(screenStates.LOADING);
  const questionIndex = currentQuestion;
  const totalQuestions = db.questions.length;
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
 const addResult =(result)=>{
  setResults([
    ...results,
    result
  ]);
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
       onSubmit = {handleQuizSubmit}
       addResult = {addResult}/>
     )}
     {screenState === screenStates. LOADING &&  <LoadingWidget/>}
     {screenState === screenStates.RESULT && <ResultWidget results={results}/>}
    </QuizContainer>
  </QuizBackground>
);
}