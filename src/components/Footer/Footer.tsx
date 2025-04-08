import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>О нас</h4>
          <p>Лучшая выпечка по доступным ценам</p>
        </div>
        
        <div className="footer-section">
          <h4>Контакты</h4>
          <p>Email: tishka514@mail.ru</p>
          <p>Телефон: +7 (919) 593-85-18</p>
        </div>
        
        <div className="footer-section">
          <h4>Адрес</h4>
          <p>г. Тюмень, ул. Пушкина, д. 1</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Кондитерский магазин. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;