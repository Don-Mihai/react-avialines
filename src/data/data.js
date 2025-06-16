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
  ruslan: {
    position: 'absolute',
    bottom: '9%',
    left: '22%',
    width: '460px',
    height: '160px',
    cursor: 'pointer'
  },
  cheluskina: {
    position: 'absolute',
    bottom: '31%',
    right: '18%',
    width: '670px',
    height: '160px',
    cursor: 'pointer'
  },
  alex: {
    position: 'absolute',
    top: '36%',
    right: '27%',
    width: '640px',
    height: '125px',
    cursor: 'pointer'
  },
  italy: {
    position: 'absolute',
    top: '16%',
    left: '22%',
    width: '690px',
    height: '160px',
    cursor: 'pointer'
  }
};
