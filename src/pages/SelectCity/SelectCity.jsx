
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { navToLocalStorageCity } from '../../helper/Helper';
import { Spinner } from '@material-tailwind/react';

const SelectCity = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    setLoading(true)
    let [url] = navToLocalStorageCity()
    setLoading(false)
    navigate(url)
  }, [])

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      {loading ? <Spinner className="h-10 w-10 " color='pink' /> : null}
    </div>
  )

}

export default SelectCity;