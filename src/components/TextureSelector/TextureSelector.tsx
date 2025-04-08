import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { changeTexture } from '../../store/slices/desertSlice';
import './TextureSelector.scss';

interface TextureSelectorProps {
  itemId: string;
}

const TextureSelector = ({ itemId }: TextureSelectorProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const desertItem = useSelector((state: RootState) => 
    state.desert.items.find(item => item.id === itemId));
  const [selectedTexture, setSelectedTexture] = useState(desertItem?.currentTexture || '');

  if (!desertItem) return null;

  const handleTextureChange = (textureId: string) => {
    setSelectedTexture(textureId);
    dispatch(changeTexture({ id: itemId, textureId }));
  };

  return (
    <div className="texture-selector">
      <h3>Выберите:</h3>
      <div className="texture-options">
        {desertItem.textures.map(texture => (
          <div 
            key={texture.id}
            className={`texture-option ${selectedTexture === texture.id ? 'selected' : ''}`}
            onClick={() => handleTextureChange(texture.id)}
          >
            <img src={texture.url} alt={texture.name} />
            <span>{texture.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextureSelector;