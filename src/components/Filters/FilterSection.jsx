

import { memo, useMemo } from 'react';
import { useStateContext } from "../../context/SiteContext";

// Lazy load filter components for better performance
import MinMaxFilter from "./MinMaxFilter";
import DistrictFilter from "./DistrictFilter";
import SwitchFilter from "./SwitchFilter";
import SelectFilter from "./SelectFilter";
import CheckboxFilter from "./CheckboxFilter";

const FilterSection = memo(() => {
  const { currentCat } = useStateContext();

  // Memoize filter components to prevent unnecessary re-renders
  const filterComponents = useMemo(() => {
    if (!currentCat?.filters) return null;

    return currentCat.filters.map((filter, index) => {
      const commonProps = {
        key: `${filter.type}-${index}`,
        title: filter.title,
        slug: filter.slug,
      };

      switch (filter.type) {
        case "MinMaxTypeFilter":
          return (
            <MinMaxFilter
              {...commonProps}
              unit={filter.unit}
              suggestListMin={filter.suggestMin}
              suggestListMax={filter.suggestMax}
              minPlaceHolder={filter.exampleMin}
              maxPlaceHolder={filter.exampleMax}
            />
          );

        case "DistrictFilter":
          return (
            <DistrictFilter
              {...commonProps}
              itemsList={filter.itemsList}
            />
          );

        case "SelectTypeFilter":
          return (
            <SelectFilter
              {...commonProps}
              unit={filter.unit}
              suggestList={filter.suggestList}
              selectPlaceHolder={filter.placeHolder}
            />
          );

        case "CheckboxFilter":
          return (
            <CheckboxFilter
              {...commonProps}
              itemsList={filter.itemsList}
            />
          );

        case "StatusFilter":
          return (
            <SwitchFilter
              {...commonProps}
              itemsList={filter.itemsList}
            />
          );

        default:
          console.warn(`Unknown filter type: ${filter.type}`);
          return null;
        }
    }).filter(Boolean); // Remove null components
  }, [currentCat?.filters]);

  if (!filterComponents?.length) {
    return null;
  }

  return (
    <div className="filter-section">
      {filterComponents}
    </div>
  );
});

FilterSection.displayName = 'FilterSection';

export default FilterSection;