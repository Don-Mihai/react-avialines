import Menu from '../../../components/Menu';
import { useLanguage } from '../../../LanguageContext';

const ItalyPage = () => {
  const { data } = useLanguage();
  return <Menu data={data.italy} />;
};

export default ItalyPage;
