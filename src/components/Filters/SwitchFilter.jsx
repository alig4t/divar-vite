
import { memo, useCallback, useEffect, useState } from 'react';
import { Switch } from '@material-tailwind/react';
import { useSearchParams } from 'react-router-dom';

const SwitchFilter = memo(({ title, itemsList }) => {
  const [queryString, setQueryString] = useSearchParams();
  const [switchChecked, setSwitchChecked] = useState([]);

  const urlMakerWithStatus = useCallback((slug) => {
    setQueryString(params => {
      if (params.has(slug)) {
        const state = params.get(slug);
        if (state === 'true') {
          params.delete(slug);
        } else {
          params.set(slug, 'true');
        }
      } else {
        params.set(slug, 'true');
      }
      return params;
    });
  }, [setQueryString]);

  const checkHandler = useCallback((slug) => {
    urlMakerWithStatus(slug);
  }, [urlMakerWithStatus]);

  useEffect(() => {
    const switchObject = [];

    itemsList.forEach(element => {
      if (queryString.has(element.slug) && queryString.get(element.slug) === "true") {
        switchObject.push(element.slug);
      }
    });

    setSwitchChecked(switchObject);
  }, [queryString, itemsList]);

  return (
    <div className="w-full p-2 border-t-2 border-gray-100 py-4">
      <h6 className="mb-4 text-16 font-bold text-pink-500 px-2">{title}</h6>
      
      <div className='flex flex-col gap-3'>
        {itemsList.map((item, index) => (
          <Switch 
            key={index} 
            label={item.title} 
            color='pink' 
            checked={switchChecked.includes(item.slug)}
            onChange={() => checkHandler(item.slug)}
          />
        ))}
      </div>
    </div>
  );
});

SwitchFilter.displayName = 'SwitchFilter';

export default SwitchFilter;