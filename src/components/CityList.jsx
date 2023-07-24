import { useCities } from '../context/CitiesContext'
import CityItem from './CityItem'
import styles from './CityList.module.css'
import Message from './Message'
import Spinner from './Spinner'


const CityList = () => {
  const {cities,loading} = useCities()
  if(loading) return <Spinner />

  if(!cities.length) return <Message message={'add your city'} />

  return (
  <ul className={styles.cityList}>
    {
       cities.map(city => (
        <CityItem key={city.id} city={city} />
      ))
    }
  </ul>
  )
}


export default CityList