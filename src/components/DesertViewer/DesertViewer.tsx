import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { addToCart } from '../../store/slices/cartSlice';
import './DesertViewer.scss';

interface DesertModelProps {
  itemId: string;
}

const DesertModel = ({ itemId }: DesertModelProps) => {
  const desertItem = useSelector((state: RootState) => 
    state.desert.items.find(item => item.id === itemId));
  
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  const currentTexture = useMemo(() => {
    return desertItem?.textures.find(t => t.id === desertItem.currentTexture)?.url || '';
  }, [desertItem]);

  const texture = useTexture(currentTexture);

  if (!desertItem) return null;

  let geometry;
  switch (desertItem.id) {
    case '1':
      geometry = new THREE.TorusGeometry(1, 0.4, 16, 64);
      break;
    case '2':
      geometry = new THREE.CylinderGeometry(1.2, 1, 0.5, 16);
      break;
    case '3':
      geometry = new THREE.CylinderGeometry( 1, 1.2, 1, 64, 3, false );
      break;
    default:
      geometry = new THREE.SphereGeometry(1, 32, 32);
      console.log(desertItem.id)
  }

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <meshStandardMaterial map={texture} color={hovered ? 'lightgray' : 'white'} />
    </mesh>
  );
};

interface DesertViewerProps {
  itemId: string;
}

const DesertViewer = ({ itemId }: DesertViewerProps) => {
  const dispatch = useDispatch();
  const desertItem = useSelector((state: RootState) => 
    state.desert.items.find(item => item.id === itemId));
  const [addedToCart, setAddedToCart] = useState(false);

  if (!desertItem) return <div className="error-message">Товар не найден</div>;

  const handleAddToCart = () => {
    const texture = desertItem.textures.find(t => t.id === desertItem.currentTexture);
    dispatch(addToCart({
      id: `${desertItem.id}-${desertItem.currentTexture}`,
      name: desertItem.name,
      price: desertItem.price,
      texture: texture?.name || '',
      type: desertItem.name
    }));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="desert-viewer-container">
      <div className="desert-viewer">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <ambientLight intensity={4} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[5, 5, 5]} />
          <DesertModel itemId={itemId} />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
      
      <button 
        className={`add-to-cart-btn ${addedToCart ? 'added' : ''}`}
        onClick={handleAddToCart}
        disabled={addedToCart}
      >
        {addedToCart ? 'Добавлено!' : `В корзину - ${desertItem.price} ₽`}
      </button>
    </div>
  );
};

export default DesertViewer;