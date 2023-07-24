import { useCities } from '../context/CitiesContext'
import CountryItem from './CountryItem'
import styles from './CountryList.module.css'
import Message from './Message'
import Spinner from './Spinner'



const CityList = () => {
  const {cities, loading} = useCities()
  if(loading) return <Spinner />

  if(!cities.length) return <Message message={'add your city'} />

  const countries = cities.reduce((arr, cities) => {
    if (!arr.map((el) => el.country).includes(cities.country))
      return [...arr, { country: cities.country, emoji: cities.emoji }];
    else return arr;
  }, []);

  return (
  <ul className={styles.countryList}>
    {
      countries.map(c => (
        <CountryItem key={Math.random()} country={c}/>
      ))
    }
  </ul>
  )
}


export default CityList