
import { memo, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const CheckboxFilter = memo(({ title, slug, itemsList }) => {
  const [checkBoxList, setCheckBoxList] = useState([]);
  const [queryString, setQueryString] = useSearchParams();
  const filterParam = queryString.get(slug);
  const regexUrl = /^(\d+|\w+)(,(\d+|\w+))*$/;

  const urlMakerWithCheckBoxFilter = useCallback((value) => {
    setQueryString(params => {
      if (params.has(slug)) {
        const vals = params.get(slug).split(',');
        const index = vals.indexOf(value);

        if (index > -1) {
          vals.splice(index, 1);
        } else {
          vals.push(value);
        }

        if (vals.length > 0) {
          params.set(slug, vals.join(','));
        } else {
          params.delete(slug);
        }
      } else {
        params.set(slug, value);
      }
      return params;
    });
  }, [slug, setQueryString]);

  const checkHandler = useCallback((val) => {
    urlMakerWithCheckBoxFilter(val);
  }, [urlMakerWithCheckBoxFilter]);

  useEffect(() => {
    if (queryString.has(slug)) {
      const urlValStr = queryString.get(slug);
      if (regexUrl.test(urlValStr)) {
        const checkListArray = [];
        const urlValArray = urlValStr.split(',');
        
        urlValArray.forEach((val) => {
          const inItemsArray = itemsList.find(item => item.value === val);
          if (inItemsArray && !checkListArray.includes(val)) {
            checkListArray.push(val);
          }
        });
        
        setCheckBoxList(checkListArray);
        return;
      }
    }
    setCheckBoxList([]);
  }, [filterParam, slug, itemsList]);

  return (
    <div className="w-full p-2 border-t-2 border-gray-100 py-4">
      <h6 className="mb-4 text-16 font-bold text-pink-500 px-2">
        {title}
      </h6>

      <div className="relative py-2">
        {itemsList.map((item, index) => (
          <button
            key={index}
            className={`inline-block bg-white border-2 border-gray-300 text-gray-700 hover:border-pink-400 transition rounded-full m-1 min-w-8 p-2 text-center py-1.5 text-xs cursor-pointer ${
              checkBoxList.includes(item.value) 
                ? "border-pink-400 hover:border-pink-600 bg-gray-100 text-gray-800" 
                : ""
            }`}
            onClick={() => checkHandler(item.value)}
            type="button"
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
});

CheckboxFilter.displayName = 'CheckboxFilter';

export default CheckboxFilter;