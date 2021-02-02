import React from 'react';
import Loader from  'react-loader-spinner';
import styled from 'styled-components';

export default function Spinner({description}) {
  return (
    <PrincipalDiv>
      <Loader
         type="TailSpin"
         color="#FFFF"
         height={50}
         width={50} 
      />
      <TextSpinner>{description}</TextSpinner>
    </PrincipalDiv>
  );
}

const PrincipalDiv = styled.div`
    align-items:center ;
    display:flex;
    flex-direction:row;
  `

const TextSpinner = styled.div`
    margin-left:10px;
    font-weight:bold;
    font-size:25px;
`