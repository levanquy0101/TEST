function App() {
    return (
      <div>
        <div className="header-banner-slider">
          <h1 className="animated-text">levanquy.com - Web công nghệ - Cung cấp mã nguồn</h1>
        </div>
        <div className="header-top"> 
          <ul>
            <li><a href="index.html"><img src="./frontend/favicon/android-icon-144x144.png" width="30px" alt=""/>levanquy.com</a></li>
            <li><a href="">Tin tức - Thủ thuật</a></li>
            <li><input type="text" placeholder="Bạn tìm gì..."/></li>
            <li><a href="">Hỏi đáp</a></li>
            <li>Thông báo<ion-icon name="notifications-circle-outline"></ion-icon></li>
            <li><a href="./login.html">User <ion-icon name="person-circle-outline"></ion-icon></a></li>
            <li className="menu"><img src="./frontend/img/list.png" alt="" width="35px"/></li>
          </ul>
        </div>
        <div className="header-main">
          <ul>
            <li><a href="web.html"><img src="./frontend/img/world-wide-web.png" alt=""/>Website</a></li>
            <li><a href=""><img src="./frontend/img/cell-phone.png" alt=""/>Mobile&nbsp;App</a></li>
            <li><a href=""><img src="./frontend/img/motherboard.png" alt=""/>Adruino</a></li>
            <li><a href=""><img src="./frontend/img/game-console.png" alt=""/>Đồ&nbsp;chơi công&nbsp;nghệ</a></li>
            <li><a href=""><img src="./frontend/img/tools.png" alt=""/>Tool hỗ trợ</a></li>
            <li><a href=""><img src="./frontend/img/customer-service.png" alt=""/>Dịch&nbsp;vụ khác</a></li> 
          </ul>
        </div>
      </div>
    );
  }
  
  ReactDOM.render(<App />, document.getElementById('root'));
  