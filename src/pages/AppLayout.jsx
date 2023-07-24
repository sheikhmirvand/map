import styles from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import { useCities } from "../context/CitiesContext";
const AppLayout = () => {
  const { loading } = useCities();
  return (
    <div className={styles.app}>
      <Sidebar />
      {!loading && <Map />}
    </div>
  );
};

export default AppLayout;
