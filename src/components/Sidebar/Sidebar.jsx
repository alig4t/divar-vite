import React from 'react';

import Categories from './Categories';
import PriceFilter from '../Filters/MinMaxFilter';
import DistrictFilter from '../Filters/DistrictFilter';
import FilterSection from '../Filters/FilterSection';

const Sidebar = () => {

    return (
        <>
            <div className='hidden md:block'>
                <Categories />
                <FilterSection />
            </div>
            
        </>
    );
}
 
export default React.memo(Sidebar);