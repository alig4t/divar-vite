import { memo, useCallback, useEffect, useState } from "react";
import { Option, Select } from "@material-tailwind/react";
import { FiX } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

const SelectFilter = memo(({ title, slug, suggestList, selectPlaceHolder }) => {
  const [queryString, setQueryString] = useSearchParams();
  const filterParam = queryString.get(slug);
  const [selected, setSelected] = useState(null);

  const selectHandler = useCallback((item) => {
    setQueryString(params => {
      params.set(slug, item);
      return params;
    });
  }, [slug, setQueryString]);

  const clearHandler = useCallback(() => {
    setSelected(null);
    setQueryString(params => {
      params.delete(slug);
      return params;
    });
  }, [slug, setQueryString]);

  useEffect(() => {
    if (queryString.has(slug)) {
      const val = queryString.get(slug);
      const inSuggestArray = suggestList.find(item => item.value === val);
      
      if (inSuggestArray) {
        setSelected(inSuggestArray.value);
      } else {
        setSelected(null);
      }
    } else {
      setSelected(null);
    }
  }, [filterParam, slug, suggestList]);

  return (
    <div className="w-full p-2 border-t-2 border-gray-100 py-4">
      <h6 className="mb-4 text-16 font-bold text-pink-500 px-2">{title}</h6>
      
      <div className="relative py-2">
        <Select 
          label={selectPlaceHolder || title} 
          value={selected} 
          onChange={selectHandler} 
          color="pink"
        >
          {suggestList.map((item, index) => (
            <Option value={item.value} key={index}>
              {item.title}
            </Option>
          ))}
        </Select>

        {selected && (
          <FiX 
            className="absolute cursor-pointer right-[6px] top-0 bottom-0 m-auto z-50" 
            onClick={clearHandler} 
          />
        )}
      </div>
    </div>
  );
});

SelectFilter.displayName = 'SelectFilter';

export default SelectFilter;