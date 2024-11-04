import React from 'react';
import hsk4 from '../../assets/hsk4.xlsx';
import './style.scss';
import HskList from '../../components/HskList';

function Hsk4() {
  return (
    <HskList excelFile={hsk4} title={'HSK 4'}/>
  );
}

export default Hsk4;
