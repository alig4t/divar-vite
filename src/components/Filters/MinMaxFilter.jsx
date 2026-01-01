
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import { FiX } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { format } from "../../helper/Helper";

const MinMaxFilter = memo(({ 
  title, 
  unit, 
  slug, 
  suggestListMin, 
  suggestListMax, 
  minPlaceHolder, 
  maxPlaceHolder 
}) => {
  const [queryString, setQueryString] = useSearchParams();
  const filterParam = queryString.get(slug);
  const regexMinMaxUrl = /^((-\d+)|(\d+\-)|(\d+\-\d+))$/;

  const [minFilter, setMinFilter] = useState(null);
  const [minInputEnter, setMinInputEnter] = useState("");
  const minInputRef = useRef(null);

  const [maxFilter, setMaxFilter] = useState(null);
  const [maxInputEnter, setMaxInputEnter] = useState("");
  const maxInputRef = useRef(null);

  // Memoize options to prevent recreation on every render
  const { minOptions, maxOptions } = useMemo(() => {
    const objEnter = { value: "enter", label: "وارد کردن مقدار دلخواه", id: "enter" };
    
    const createOptions = (list) => {
      const values = list.map((item) => ({
        value: item,
        label: unit === 'تومان' ? Number(item).toLocaleString() : `${Number(item)} ${unit}`,
        id: `option-${item}`
      }));
      return [...values, objEnter];
    };

    return {
      minOptions: createOptions(suggestListMin),
      maxOptions: createOptions(suggestListMax)
    };
  }, [suggestListMin, suggestListMax, unit]);

  // Memoized input change handlers
  const changeMinInputHandler = useCallback((val) => {
    const newVal = unit === 'تومان' ? format(val) : val;
    setMinInputEnter(newVal);
    setMinFilter("enter");
  }, [unit]);

  const changeMaxInputHandler = useCallback((val) => {
    const newVal = unit === 'تومان' ? format(val) : val;
    setMaxInputEnter(newVal);
    setMaxFilter("enter");
  }, [unit]);

  // URL maker function
  const urlMakerWithMinMaxFilter = useCallback((slug, value, opt) => {
    setQueryString(params => {
      let minFilterUrl = '';
      let maxFilterUrl = '';
      let newArrayFilter = ['', ''];

      if (params.has(slug)) {
        const filters = params.get(slug).split("-");
        minFilterUrl = filters[0];
        maxFilterUrl = filters[1];
        
        if (opt === "max") {
          newArrayFilter[0] = minFilterUrl;
          newArrayFilter[1] = value;
        } else {
          newArrayFilter[0] = value;
          newArrayFilter[1] = maxFilterUrl;
        }
      } else {
        if (opt === "max") {
          newArrayFilter[1] = value;
        } else {
          newArrayFilter[0] = value;
        }
      }

      const newFilterQuery = newArrayFilter.join("-");
      if (newFilterQuery === '-') {
        params.delete(slug);
      } else {
        params.set(slug, newFilterQuery);
      }
      return params;
    });
  }, [setQueryString]);

  // Clear handlers
  const clearMax = useCallback(() => {
    setMaxFilter(null);
    setMaxInputEnter("");
    urlMakerWithMinMaxFilter(slug, '', "max");
  }, [slug, urlMakerWithMinMaxFilter]);

  const clearMin = useCallback(() => {
    setMinFilter(null);
    setMinInputEnter("");
    urlMakerWithMinMaxFilter(slug, '', "min");
  }, [slug, urlMakerWithMinMaxFilter]);

  // Select handlers
  const selectMinHandler = useCallback((value) => {
    if (value === "enter") {
      setMinFilter(value);
      setTimeout(() => {
        minInputRef.current?.focus();
      }, 100);
    } else {
      setMinFilter(value);
      urlMakerWithMinMaxFilter(slug, value, "min");
    }
  }, [slug, urlMakerWithMinMaxFilter]);

  const selectMaxHandler = useCallback((value) => {
    if (value === "enter") {
      setMaxFilter(value);
      setTimeout(() => {
        maxInputRef.current?.focus();
      }, 100);
    } else {
      setMaxFilter(value);
      urlMakerWithMinMaxFilter(slug, value, "max");
    }
  }, [slug, urlMakerWithMinMaxFilter]);

  // Submit handlers
  const minSubmit = useCallback((e) => {
    const unformatted = parseInt(e.target.value.replace(/,/g, ''));
    if (e.key === 'Enter' || e.type === 'blur') {
      minInputRef.current?.blur();
      urlMakerWithMinMaxFilter(slug, unformatted, "min");
    }
  }, [slug, urlMakerWithMinMaxFilter]);

  const maxSubmit = useCallback((e) => {
    const unformatted = parseInt(e.target.value.replace(/,/g, ''));
    if (e.key === 'Enter' || e.type === 'blur') {
      maxInputRef.current?.blur();
      urlMakerWithMinMaxFilter(slug, unformatted, "max");
    }
  }, [slug, urlMakerWithMinMaxFilter]);

  // Effect to handle URL parameter changes
  useEffect(() => {
    if (queryString.has(slug)) {
      if (regexMinMaxUrl.test(queryString.get(slug))) {
        const filterArray = queryString.get(slug).split("-");
        const minFilterUrl = filterArray[0];
        const maxFilterUrl = filterArray[1];

        if (suggestListMin.includes(minFilterUrl)) {
          selectMinHandler(minFilterUrl);
        } else if (minFilterUrl.length > 0) {
          changeMinInputHandler(minFilterUrl);
        }

        if (suggestListMax.includes(maxFilterUrl)) {
          selectMaxHandler(maxFilterUrl);
        } else if (maxFilterUrl.length > 0) {
          changeMaxInputHandler(maxFilterUrl);
        }
      }
    } else {
      setMinFilter(null);
      setMaxFilter(null);
      setMinInputEnter("");
      setMaxInputEnter("");
    }
  }, [filterParam, slug, suggestListMin, suggestListMax, selectMinHandler, selectMaxHandler, changeMinInputHandler, changeMaxInputHandler]);

  return (
    <div className="w-full p-2 border-t-2 border-gray-100 py-4">
      <h6 className="mb-2 text-16 font-bold text-pink-500 px-2">{title}</h6>

      {/* Min Filter */}
      <div className="relative py-3">
        <Select 
          label={`حداقل ${title}`} 
          value={minFilter} 
          onChange={selectMinHandler} 
          color="pink"
        >
          {minOptions.map((option, index) => (
            <Option key={`min-${index}`} value={String(option.value)}>
              {option.label}
            </Option>
          ))}
        </Select>
        
        {minFilter && (
          <FiX 
            className="absolute cursor-pointer right-[6px] top-0 bottom-0 m-auto z-50" 
            onClick={clearMin} 
          />
        )}

        {minFilter === "enter" && (
          <>
            <input 
              ref={minInputRef} 
              value={minInputEnter} 
              onChange={(e) => changeMinInputHandler(e.target.value)} 
              type="text" 
              className="absolute top-0 bottom-0 m-auto max-h-5 w-[159px] px-3 pr-5 focus:outline-none right-2 z-40 text-sm leading-[25px] text-pink-500 placeholder:text-12" 
              placeholder={minPlaceHolder || "مقدار دلخواه را وارد نمایید.."} 
              onBlur={minSubmit} 
              onKeyDown={minSubmit} 
            />
            {minInputEnter.length > 0 && (
              <span className="absolute cursor-pointer flex items-center w-6 text-xs left-10 top-0 bottom-0 m-auto z-50">
                {unit}
              </span>
            )}
          </>
        )}
      </div>

      {/* Max Filter */}
      <div className="relative py-2">
        <Select 
          label={`حداکثر ${title}`} 
          value={maxFilter} 
          onChange={selectMaxHandler} 
          color="pink"
        >
          {maxOptions.map((option, index) => (
            <Option key={`max-${index}`} value={String(option.value)}>
              {option.label}
            </Option>
          ))}
        </Select>
        
        {maxFilter && (
          <FiX 
            className="absolute cursor-pointer right-[6px] top-0 bottom-0 m-auto z-50" 
            onClick={clearMax} 
          />
        )}

        {maxFilter === "enter" && (
          <>
            <input 
              ref={maxInputRef} 
              value={maxInputEnter} 
              onChange={(e) => changeMaxInputHandler(e.target.value)} 
              type="text" 
              className="absolute top-0 bottom-0 m-auto max-h-5 w-[159px] px-3 pr-5 focus:outline-none right-2 z-40 text-sm leading-[24px] text-pink-500 placeholder:text-12" 
              placeholder={maxPlaceHolder || "مقدار دلخواه را وارد نمایید.."} 
              onBlur={maxSubmit} 
              onKeyDown={maxSubmit} 
            />
            {maxInputEnter.length > 0 && (
              <span className="absolute cursor-pointer flex items-center w-6 text-xs left-10 top-0 bottom-0 m-auto z-50">
                {unit}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
});

MinMaxFilter.displayName = 'MinMaxFilter';

export default MinMaxFilter;