import React from 'react';
import './StorePage.css';
import Image from '../../assets/430979226_900311152100790_8763000524264801293_n (1).jpg';

function StorePage() {
  return (
    <div className="store-page-container">
      <div className="store-content">
        <div className="store-image-container">
          <img className="store-image" src={Image} alt="Ui Farm" />
        </div>
        <div className="info-card">
          <h1>About Ui Farm</h1>
          <p>🌱 Ui farm đi lên từ những nét thêu tay "vụng về". Qua thời gian thấm nhuần sự chăm chỉ và kiên trì, Ui càng hiểu và yêu giá trị quý báu được làm nên từ đôi bàn tay Việt...</p>
          <p>"THIẾT KẾ ĐỘC QUYỀN BỞI UI FARM. BẤT KÌ MỘT CHIẾC ÁO NÀO TRÊN THỊ TRƯỜNG GIỐNG UI FARM, ĐỀU LÀ HÀNG SAO CHÉP"</p>
        </div>
      </div>
    </div>
  );
}

export default StorePage;
