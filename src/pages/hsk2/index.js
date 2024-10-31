import React, { useEffect, useState, useRef } from 'react';
import Card from '../../components/Card';
import hsk2 from '../../assets/hsk2.xlsx';
import './style.scss';
import { fetchExcelData } from '../../utils/core';

function Hsk2() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const [hanziMode, setHanziMode] = useState(true);
  const [pinyinMode, setPinyinMode] = useState(true);
  const [meanMode, setMeanMode] = useState(true);

  const [selectedItems, setSelectedItems] = useState(() => {
    const savedItems = localStorage.getItem('selectedItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [selectedItemsNo, setSelectedItemsNo] = useState(() => {
    const savedItemsNo = localStorage.getItem('selectedItemsNo');
    return savedItemsNo ? JSON.parse(savedItemsNo) : [];
  });

  const listRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      const edata = await fetchExcelData(hsk2);
      setData(edata);
      setFilteredData(edata);
    };

    loadData();
  }, []);

  useEffect(() => {
    const result = data.filter((item) =>
      (item.hanzi && item.hanzi.includes(searchTerm)) ||
      (item.pinyin && item.pinyin.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.mean && item.mean.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredData(result);
  }, [searchTerm, data]);

  useEffect(() => {
    const savedScrollPosition = localStorage.getItem('scrollPosition');
    if (savedScrollPosition && listRef.current) {
      listRef.current.scrollTop = parseInt(savedScrollPosition, 10);
    }
  }, [filteredData]);

  const handleScroll = () => {
    if (listRef.current) {
      localStorage.setItem('scrollPosition', listRef.current.scrollTop);
    }
  };

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
      <h6 className='text-center'>HSK 2</h6>
      <input
        type="text"
        placeholder="Tìm kiếm từ vựng..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div>
        <button className='status_pinyin' onClick={() => setPinyinMode(!pinyinMode)}>
          <i className="bi bi-exclamation-circle"></i>
        </button>
        <button className='status_hanzi' onClick={() => setHanziMode(!hanziMode)}>
          <i className="bi bi-spellcheck"></i>
        </button>
        <button className='status_mean' onClick={() => setMeanMode(!meanMode)}>
          <i className="bi bi-droplet-fill text-primary"></i>
        </button>
      </div>
      <div
        className='list_hsk1'
        ref={listRef}
        onScroll={handleScroll}
      >
        {filteredData && filteredData.map((item, index) => (
          <Card
            key={index}
            hanzi={hanziMode ? item.hanzi : ''}
            pinyin={pinyinMode ? item.pinyin : ''}
            mean={meanMode ? item.mean : ''}
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

export default Hsk2;
