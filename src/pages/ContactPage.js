import React from 'react';
import '../pages/StorePage/StorePage.css';
import Image from '../assets/361351168_742332481231992_7822779121274112498_n.jpg';

function ContactPage() {
  return (
    <div className="store-page-container">
      <div className="store-content">
        <div className="store-image-container">
          <img className="store-image" src={Image} alt="Ui Farm" />
        </div>
        <div className="info-card">
          <h1>Contact with Ui Farm</h1>
          <p>🌿 Đặt may áo dài tại FB: UI farm hoặc IG: @uifarm_2020, nàng có thể đặt online hoặc đặt lịch hẹn tới studio của UI để được tư vấn cụ thể kèm lấy ni áo chuẩn để may ra tấm áo đẹp nhất 🇻🇳</p>
          <p>#uifarm #aodai #aodaivietnam #vietnam #linen #luangocanh #silk</p>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
