import Menu from '../../../components/Menu';
import { useLanguage } from '../../../LanguageContext';

const RuslanPage = () => {
  const { data } = useLanguage();
  return <Menu data={data.ruslan} />;
};

export default RuslanPage;
