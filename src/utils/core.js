import * as XLSX from 'xlsx';

export const onReadHanzi = (hanzi) => {
    if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(hanzi);
        utterance.lang = 'zh-CN';
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    } else {
        console.error("SpeechSynthesis API is not supported on this browser.");
    }
};

export const fetchExcelData = async (excelPath) => {
    try {
        const response = await fetch(excelPath);
        const buffer = await response.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet).map((item, index) => ({ ...item, index }));
        return data;
    } catch (error) {
        console.error('Error reading Excel file:', error);
        return [];
    }
};

