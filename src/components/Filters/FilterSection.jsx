

import React from "react";
import MinMaxFilter from "./MinMaxFilter";
import DistrictFilter from "./DistrictFilter";
import SwitchFilter from "./SwitchFilter";
import SelectFilter from "./SelectFilter";
import CheckboxFilter from "./CheckboxFilter";
import { useStateContext } from "../../context/SiteContext";

const FilterSection = () => {

    const { currentCat } = useStateContext()


    return (
        <>
            {
                currentCat?.filters?.map((fil, index) => {
                    switch (fil.type) {
                        case "MinMaxTypeFilter":
                            return <MinMaxFilter
                                key={index}
                                title={fil.title}
                                unit={fil.unit}
                                slug={fil.slug}
                                suggestListMin={fil.suggestMin}
                                suggestListMax={fil.suggestMax}
                                minPlaceHolder={fil.exampleMin}
                                maxPlaceHolder={fil.exampleMax}
                            />
                        case "DistrictFilter":
                            return <DistrictFilter
                                key={index}
                                title={fil.title}
                                slug={fil.slug}
                                itemsList={fil.itemsList}
                            />
                        case "SelectTypeFilter":
                            return <SelectFilter
                                key={index}
                                title={fil.title}
                                slug={fil.slug}
                                unit={fil.unit}
                                suggestList={fil.suggestList}
                                selectPlaceHolder={fil.placeHolder}
                            />
                        case "CheckboxFilter":
                            return <CheckboxFilter
                                key={index}
                                slug={fil.slug}
                                title={fil.title}
                                itemsList={fil.itemsList}
                            />
                        case "StatusFilter":
                            return <SwitchFilter
                                key={index}
                                title={fil.title}
                                itemsList={fil.itemsList}
                            />

                    }
                })

            }
            {/* // 
            // <SwitchFilter />

            // <CheckboxFilter /> */}
        </>
    )
}

export default FilterSection;