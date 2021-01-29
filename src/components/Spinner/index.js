import React from 'react';
import Loader from  'react-loader-spinner';

export default function Spinner({description}) {
  return (
    <div style={styles.divSpiner}>
      <Loader
         type="TailSpin"
         color="#FFFF"
         height={50}
         width={50}
      />
      <div style={styles.descriptionSpinner}>{description}</div>
    </div>
  );
}
const styles = {
  divSpiner: {
    alignItems:'center',
    display:'flex',
    flexDirection:'row'},
  descriptionSpinner: {
    marginLeft:'10px',
    fontWeight:'bold',
    fontSize:'25px'
  }

}