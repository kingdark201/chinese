import React from 'react';
import hsk2 from '../../assets/hsk2.xlsx';
import './style.scss';
import HskList from '../../components/HskList';

function Hsk2() {
  return (
    <HskList excelFile={hsk2} title={'HSK 2'}/>
  );
}

export default Hsk2;
