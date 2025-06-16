import { ru } from './ru';
import { en } from './en';

export const translations = {
  ru: {
    ...ru,
    accessibilityToggle: 'Версия для\nслабовидящих',
    accessibilityNormal: 'Обычная версия\nприложения',
    catalog: 'каталог\nэкспонатов',
    audioguide: 'аудиогид\nпо приложению'
  },
  en: {
    ...en,
    accessibilityToggle: 'Visually impaired\nversion',
    accessibilityNormal: 'Normal\nversion',
    catalog: 'catalog\nof exhibits',
    audioguide: 'audio guide\nof the app'
  }
};

export const operationStyles = {
  dorne: {
    position: 'absolute',
    top: '66%',
    right: '17%',
    width: '640px',
    height: '177px',
    cursor: 'pointer'
  },
  tracks: {
    position: 'absolute',
    top: '39%',
    left: '3%',
    width: '690px',
    height: '160px',
    cursor: 'pointer'
  }
};
