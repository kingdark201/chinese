import React, { useState } from 'react'
import './style.scss'
import bgImage from '../../assets/bg.png';
import { Link } from 'react-router-dom';
import { ROUTERS } from '../../utils/router';

function HomePage() {
  const [guide, setGuide] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const handleReset = () => {
    localStorage.clear();
    setIsResetting(true);
    setTimeout(() => {
      setIsResetting(false);
    }, 3000);
  }
  return (
    <div>
      <div className='box' style={{ backgroundImage: `url(${bgImage})` }}>
        <h1 className='animate__animated animate__zoomInDown'>中文</h1>

        <div className='box_hsk_btn'>
          <Link to={ROUTERS.HSK1} className='box-hsk'>
            HSK1
          </Link>
          <Link to={ROUTERS.HSK2} className='box-hsk'>
            HSK2
          </Link>
          <Link to={ROUTERS.HSK3} className='box-hsk'>
            HSK3
          </Link>
        </div>
        <div className='box_hsk_btn'>
          <Link to={ROUTERS.HSK4} className='box-hsk'>
            HSK4
          </Link>
          <Link to={ROUTERS.HSK5} className='box-hsk'>
            HSK5
          </Link>
          <Link to={ROUTERS.HSK6} className='box-hsk'>
            HSK6
          </Link>
        </div>
        <Link className='box-hd' onClick={() => setGuide(!guide)}>
          Hướng dẫn
        </Link>


        <p className='mota'>Ghi nhớ tiếng Trung dễ dàng</p>
        <p className='author'>Design by Hoàng Duy</p>
      </div>

      {guide && (
        <div className='animate__animated animate__fadeIn'>
          <div className='guide_box'>
            <button className='close_btn' onClick={() => setGuide(false)}><i className="bi bi-x-circle-fill"></i></button>
            <p><i className="bi bi-eye-fill text-primary"></i>: Xem cách viết hán tự</p>
            <p><i className="bi bi-pencil-fill text-warning"></i>: Viết hán tự</p>
            <p><i className="bi bi-chat-square-dots-fill text-danger"></i>: Xem ví dụ liên quan</p>
            <p><i className="bi bi-clipboard-check text-success"></i>: Đánh dấu hán tự đã học</p>
            <p><i className="bi bi-bookmark-x text-danger"></i>: Đánh dấu hán tự cần bỏ qua</p>
            <p><i className="bi bi-exclamation-circle"></i>: Ẩn, hiện pinyin</p>
            <p><i className="bi bi-spellcheck"></i>: Ẩn, hiện hán tự</p>
            <p><i className="bi bi-droplet-fill text-primary"></i>: Ẩn, hiện nghĩa hán tự</p>
            <p>🔊: Nghe phát âm</p>
            <p>Lưu ý: xóa dữ liệu web cũng sẽ xóa tất cả thiết lập trên trang web</p>
            <p className='text-danger text-center delete' onClick={handleReset}>Đặt lại các bài học {isResetting ? <i className="bi bi-trash-fill"></i> : <i className="bi bi-check-all text-success"></i>}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage

