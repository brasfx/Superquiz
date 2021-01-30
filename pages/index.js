import React, { useState } from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';

export default function Home() {
const router = useRouter();
const [username,setUsername] = useState('');

const handleChange =(event)=>{ 
  setUsername(event.target.value);
  
};
const handleSubmit= (event)=>{
  event.preventDefault();
  router.push(`\quiz?name=${username}`);
  console.log(`Enviado o nome ${username}`);
};

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title> Supernatural Quiz</title>
        <meta
          key="og:image"
          name="og:image"
          content={db.bg}
        />
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Supernatural</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={handleSubmit}>
              <Input placeholder="Insira aqui seu nome" onChange={handleChange} name="username" value={username}/>
              <Button type="submit" disabled={username.length === 0}>
                {`Jogar ${username}`}
              </Button>
            </form>
            <p>Teste seus conhecimentos sobre a série Supernatural e divirta compartilhando seu resultado com todos os amigos! </p>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>Aqui vão as perguntas do quiz!</h1>
            <p>Um superquiz para super fãs </p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/brasfx/Superquiz" />
    </QuizBackground>
  );
}
