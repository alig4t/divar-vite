
import { useEffect, useCallback, useMemo } from 'react';
import { useParams, useSearchParams, useLocation, useNavigate } from "react-router-dom";

import Layout from '../../components/Layout/Layout';
import { useStateContext } from '../../context/SiteContext';
import { checkValidCat, checkValidCities, navToLocalCityAndCat } from '../../helper/Helper';

import Posts from '../../components/Posts/Posts';
import Sidebar from "../../components/Sidebar/Sidebar";
import PostNav from '../../components/Navbar/PostNav';
import WrongUrlAlert from '../../components/UI/WrongUrlAlert';
import BottomNav from '../../components/Navbar/BottomNav';

const Home = () => {
  const { city, cat } = useParams();
  const [queryString] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { currentCity, setCityHandler, currentCat, setCatHandler } = useStateContext();

  // Memoize derived values
  const citiesString = useMemo(() => queryString.get('cities'), [queryString]);
  const catSlug = useMemo(() => cat || '', [cat]);

  // Memoized navigation handler
  const handleInvalidNavigation = useCallback((type) => {
    const url = navToLocalCityAndCat();
    navigate(url, { state: { wrong: true, type } });
  }, [navigate]);

  // City validation effect
  useEffect(() => {
    const [validUrl, cityListArray, ids] = checkValidCities(city, citiesString);
    
    if (validUrl) {
      // Only update if the city data has actually changed
      const currentIdsString = currentCity.idsArray.sort().join(',');
      const newIdsString = ids.sort().join(',');
      
      if (currentIdsString !== newIdsString) {
        setCityHandler(ids, cityListArray);
      }
    } else {
      handleInvalidNavigation("city");
    }
  }, [city, citiesString, handleInvalidNavigation]); // Removed setCityHandler from dependencies

  // Category validation effect
  useEffect(() => {
    if (catSlug === currentCat.slug) return;

    const [ValidCat, catObj] = checkValidCat(cat);
    
    if (ValidCat) {
      setCatHandler(catObj);
    } else {
      handleInvalidNavigation("cat");
    }
  }, [cat, catSlug, handleInvalidNavigation]); // Removed setCatHandler and currentCat.slug from dependencies

  // Memoize wrong alert condition
  const showWrongAlert = useMemo(() => 
    location.state?.wrong, 
    [location.state?.wrong]
  );

  return (
    <Layout page="index" className="">
      <div className='flex items-start m-auto max-w-7xl'>
        <Sidebar />
        <main className="w-full px-3 md:pr-6 py-6 min-h-screen">
          <PostNav />
          <Posts />
        </main>
        {showWrongAlert && (
          <WrongUrlAlert 
            currentCity={currentCity} 
            currentCat={currentCat} 
            type={location.state.type} 
          />
        )}
      </div>
      <BottomNav />
    </Layout>
  );
};

export default Home;