const onReadHanzi = (hanzi) => {
    if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(hanzi);
        utterance.lang = 'zh-CN'; // Thiết lập ngôn ngữ là tiếng Trung
        window.speechSynthesis.cancel(); // Hủy bất kỳ phát âm nào đang diễn ra
        window.speechSynthesis.speak(utterance); // Bắt đầu phát âm
    } else {
        console.error("SpeechSynthesis API không được hỗ trợ trên trình duyệt này.");
    }
};

export default onReadHanzi;
