import React from 'react';
import hsk3 from '../../assets/hsk3.xlsx';
import './style.scss';
import HskList from '../../components/HskList';

function Hsk3() {
  return (
    <HskList excelFile={hsk3} title={'HSK 3'}/>
  );
}

export default Hsk3;
