import Menu from '../../../components/Menu';
import { useLanguage } from '../../../LanguageContext';

const CheluskinaPage = () => {
  const { data } = useLanguage();
  return <Menu data={data.cheluskina} />;
};

export default CheluskinaPage;
