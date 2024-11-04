import React from 'react';
import hsk6 from '../../assets/hsk6.xlsx';
import './style.scss';
import HskList from '../../components/HskList';

function Hsk6() {
  return (
    <HskList excelFile={hsk6} title={'HSK 6'}/>
  );
}

export default Hsk6;
