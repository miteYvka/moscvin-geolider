import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Texture {
  id: string;
  name: string;
  url: string;
}

interface DesertItem {
  id: string;
  name: string;
  price: number;
  textures: Texture[];
  currentTexture: string;
}

interface DesertState {
  items: DesertItem[];
}

const initialState: DesertState = {
  items: [
    {
      id: '1',
      name: 'Пончик',
      price: 75,
      textures: [
        { id: '1-1', name: 'Клубничный', url: '/textures/ponchik-1.png' },
        { id: '1-2', name: 'Шоколадный', url: '/textures/ponchik-2.png' },
        { id: '1-3', name: 'Ванильный', url: '/textures/ponchik-3.png' },
      ],
      currentTexture: '1-1',
    },
    {
      id: '2',
      name: 'Корж',
      price: 150,
      textures: [
        { id: '2-1', name: 'Шоколадный', url: '/textures/korj-1.png' },
        { id: '2-2', name: 'Ванильный', url: '/textures/korj-2.png' },
        { id: '2-3', name: 'Апельсиновый', url: '/textures/korj-3.png' },
      ],
      currentTexture: '2-1',
    },
    {
      id: '3',
      name: 'Торт',
      price: 750,
      textures: [
        { id: '3-1', name: 'Шоколадный', url: '/textures/cake-1.png' },
        { id: '3-2', name: 'Карамельный', url: '/textures/cake-2.png' },
        { id: '3-3', name: 'Кремовый', url: '/textures/cake-3.png' },
      ],
      currentTexture: '3-1',
    },
  ],
};

const desertSlice = createSlice({
  name: 'desert',
  initialState,
  reducers: {
    changeTexture: (state, action: PayloadAction<{ id: string; textureId: string }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.currentTexture = action.payload.textureId;
      }
    },
  },
});

export const { changeTexture } = desertSlice.actions;
export default desertSlice.reducer;