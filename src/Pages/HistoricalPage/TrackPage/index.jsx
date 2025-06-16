import Menu from '../../../components/Menu';
import { useLanguage } from '../../../LanguageContext';

const TrackPage = () => {
  const { data } = useLanguage();
  return <Menu data={data.operations.tracks} />;
};

export default TrackPage;
