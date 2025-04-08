import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import DesertViewer from './components/DesertViewer/DesertViewer';
import TextureSelector from './components/TextureSelector/TextureSelector';
import Cart from './components/Cart/Cart';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import './styles/main.scss';

const App = () => {
  const [selectedItem, setSelectedItem] = useState('1');

  return (
    <Provider store={store}>
        <div className="app">
          <Navbar />
          <main>
            <h1>Заказ десертов</h1>
            <div className="desert-selection">
              <div className="desert-types">
                <button 
                  className={selectedItem === '1' ? 'active' : ''}
                  onClick={() => setSelectedItem('1')}
                >
                  Пончики
                </button>
                <button 
                  className={selectedItem === '2' ? 'active' : ''}
                  onClick={() => setSelectedItem('2')}
                >
                  Коржи
                </button>
                <button 
                  className={selectedItem === '3' ? 'active' : ''}
                  onClick={() => setSelectedItem('3')}
                >
                  Торты
                </button>
              </div>
              <div className="desert-display">
                <DesertViewer itemId={selectedItem} />
                <TextureSelector itemId={selectedItem} />
              </div>
            </div>
          </main>
          <Cart />
          <Footer />
        </div>
    </Provider>
  );
};

export default App;