import Menu from '../../../components/Menu';
import { useLanguage } from '../../../LanguageContext';

const DorniePage = () => {
  const { data } = useLanguage();
  console.log(data.dorne, data);
  return <Menu data={data.operations.dorne} />;
};

export default DorniePage;
