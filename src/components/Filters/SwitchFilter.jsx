
import { Switch } from '@material-tailwind/react';
import React from 'react';

const SwitchFilter = () => {
    return (
        <>
            <div className="w-full p-2  border-t-2 border-gray-100 py-4">
                <h6 className="mb-4 text-16 font-bold text-pink-500 px-2">وضعیت آگهی</h6>
                <div className='flex flex-col gap-3'>
                    <Switch label="حذف توافقی ها" color='pink' />
                    <Switch label="فقط فوری ها" color='pink' />
                </div>
            </div>
        </>
    );
}

export default SwitchFilter;