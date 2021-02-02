import React from 'react';
import QuizScreen from '../../src/screens/Quiz'
import {ThemeProvider} from 'styled-components';

export default function QuizDaGaleraPage({dbExterno}) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen externalQuestions={dbExterno.questions} externalBg={dbExterno.bg}/>
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');
  /* console.log(context.query);
  console.log('PJName',projectName);
  console.log('User git',githubUser); */

  try {
    const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db/`)
    .then((respostaDoServer) => {
      console.log(respostaDoServer);
        if (respostaDoServer.ok) {
          return respostaDoServer.json();
        }
        throw new Error('Falha em pegar os dados');
      })
      .then((respostaConvertidaEmObjeto) =>{
        return respostaConvertidaEmObjeto
      }).catch((err)=> {
        console.error('Aqui está seu erro => ',err);
      });

    return {
      props: {
        dbExterno,
      },
    };
  } catch(err) {
    throw new Error(err);
  }
}
