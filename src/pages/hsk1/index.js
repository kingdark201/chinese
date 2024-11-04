import React from 'react';
import hsk1 from '../../assets/hsk1.xlsx';
import HskList from '../../components/HskList';

function Hsk1() {
  return (
    <HskList excelFile={hsk1} title={'HSK 1'}/>
  );
}

export default Hsk1;
