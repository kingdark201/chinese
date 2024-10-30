import React, { useEffect, useState } from 'react';
import Card from '../../components/Card';
import * as XLSX from 'xlsx';
import excelFile from '../../assets/chinese.xlsx';
import './style.scss';

function Hsk1() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItems, setSelectedItems] = useState(() => {
    const savedItems = localStorage.getItem('selectedItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [selectedItemsNo, setSelectedItemsNo] = useState(() => {
    const savedItemsNo = localStorage.getItem('selectedItemsNo');
    return savedItemsNo ? JSON.parse(savedItemsNo) : [];
  });

  useEffect(() => {
    const fetchExcelData = async () => {
      try {
        const response = await fetch(excelFile);
        const buffer = await response.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const edata = XLSX.utils.sheet_to_json(worksheet).map((item, index) => ({ ...item, index }));
        setData(edata);
        setFilteredData(edata);
      } catch (error) {
        console.error('Error reading Excel file:', error);
      }
    };

    fetchExcelData();
  }, []);

  useEffect(() => {
    const result = data.filter((item) =>
      (item.hanzi && item.hanzi.includes(searchTerm)) ||
      (item.pinyin && item.pinyin.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.mean && item.mean.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredData(result);
  }, [searchTerm, data]);

  const toggleSelectItem = (item) => {
    const isSelected = selectedItems.some(selected => selected.hanzi === item.hanzi);

    const updatedSelectedItems = isSelected
      ? selectedItems.filter(selected => selected.hanzi !== item.hanzi)
      : [...selectedItems, item];

    if (!isSelected) {
      const updatedSelectedItemsNo = selectedItemsNo.filter(selected => selected.hanzi !== item.hanzi);
      setSelectedItemsNo(updatedSelectedItemsNo);
      localStorage.setItem('selectedItemsNo', JSON.stringify(updatedSelectedItemsNo));
    }

    setSelectedItems(updatedSelectedItems);
    localStorage.setItem('selectedItems', JSON.stringify(updatedSelectedItems));
  };

  const toggleSelectItemNo = (item) => {
    const isSelected = selectedItemsNo.some(selected => selected.hanzi === item.hanzi);

    const updatedSelectedItemsNo = isSelected
      ? selectedItemsNo.filter(selected => selected.hanzi !== item.hanzi)
      : [...selectedItemsNo, item];

    if (!isSelected) {
      const updatedSelectedItems = selectedItems.filter(selected => selected.hanzi !== item.hanzi);
      setSelectedItems(updatedSelectedItems);
      localStorage.setItem('selectedItems', JSON.stringify(updatedSelectedItems));
    }

    setSelectedItemsNo(updatedSelectedItemsNo);
    localStorage.setItem('selectedItemsNo', JSON.stringify(updatedSelectedItemsNo));
  };

  return (
    <div className='hsk1'>
      <input
        type="text"
        placeholder="Tìm kiếm từ vựng..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className='list_hsk1'>
        {filteredData && filteredData.map((item, index) => (
          <Card
            key={index}
            hanzi={item.hanzi}
            pinyin={item.pinyin}
            mean={item.mean}
            onClickOk={() => toggleSelectItem(item)}
            isSelectedOk={selectedItems.some(selected => selected.hanzi === item.hanzi)}
            onClickNo={() => toggleSelectItemNo(item)}
            isSelectedNo={selectedItemsNo.some(selected => selected.hanzi === item.hanzi)}
            hanziExp={item.hanziExp}
            pinyinExp={item.pinyinExp}
            meanExp={item.meanExp}
          />
        ))}
      </div>
    </div>
  );
}

export default Hsk1;
