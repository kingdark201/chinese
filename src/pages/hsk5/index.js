import React from 'react';
import hsk5 from '../../assets/hsk5.xlsx';
import './style.scss';
import HskList from '../../components/HskList';

function Hsk5() {
  return (
    <HskList excelFile={hsk5} title={'HSK 5'}/>
  );
}

export default Hsk5;
