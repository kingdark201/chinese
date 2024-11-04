import React, { useEffect, useState, useRef } from 'react';
import Card from './Card';
import './HskStyle.scss';
import { fetchExcelData } from '../utils/core';

function HskList({ excelFile, title }) {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false); // State for Scroll-to-Top button

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
      setLoading(true);
      const edata = await fetchExcelData(excelFile);
      setData(edata);
      setFilteredData(edata);
      setLoading(false);
    };

    loadData();
  }, [excelFile]);

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
    setShowScrollButton(listRef.current.scrollTop > 300); // Show button after 300px of scrolling
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

  const scrollToTop = () => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className='hsk-list'>
      <h6 className='text-center'>{title}</h6>
      <input
        type="text"
        placeholder="Tìm kiếm từ vựng..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div>
        <button className={`status_pinyin ${!pinyinMode ? 'bg-primary': ''}`} onClick={() => setPinyinMode(!pinyinMode)}>
          <i className="bi bi-exclamation-circle"></i>
        </button>
        <button className={`status_hanzi ${!hanziMode ? 'bg-warning': ''}`} onClick={() => setHanziMode(!hanziMode)}>
          <i className="bi bi-spellcheck"></i>
        </button>
        <button className={`status_mean ${!meanMode ? 'bg-secondary': ''}`} onClick={() => setMeanMode(!meanMode)}>
          <i className="bi bi-droplet-fill text-primary"></i>
        </button>
      </div>
      {loading ? (
        <div className="loading-message">Đang tải...</div>
      ) : (
        <div
          className='list_hsk'
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
      )}
      {showScrollButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <i className="bi bi-arrow-up-circle"></i>
        </button>
        
      )}
    </div>
  );
}

export default HskList;
