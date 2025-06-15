import Menu from '../../../components/Menu';
import { useLanguage } from '../../../LanguageContext';

const AlexPage = () => {
  const { data } = useLanguage();
  return <Menu data={data.alex} />;
};

export default AlexPage;
