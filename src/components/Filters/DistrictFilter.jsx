import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  List,
  Checkbox,
  ListItem,
} from "@material-tailwind/react";

import { IoIosClose } from "react-icons/io";
import { FiChevronLeft, FiX } from "react-icons/fi";
import { useNavigate, useSearchParams } from 'react-router-dom';




const DistrictFilter = (props) => {

  const [queryString, setQueryString] = useSearchParams();
  const filterParam = queryString.get(props.slug)
  let prevIdsParams = ""
  let mahaleNumber = 0;
  if (filterParam) {
    prevIdsParams = filterParam.split(',');
    mahaleNumber = prevIdsParams.length
    prevIdsParams = prevIdsParams.sort().join("");
  }
  const [searchVal, setSearchVal] = useState("")
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = React.useState(false);

  const [selectedFilters, setSelectedFilters] = useState({ list: [], ids: [] })


  const [listShow, setListShow] = useState([...props.itemsList])


  const handleOpen = () => {
    setModalOpen(!modalOpen)
    setSearchVal("")
    setListShow([...props.itemsList])
  };

  const clearChecked = () => {
    setSelectedFilters({ list: [], ids: [], ...selectedFilters.initIds })
  }
  const regexDistrict = /(^\d+(\,\d+)*$)/g;


  useEffect(() => {

    if (queryString.has(props.slug)) {
      let urlValStr = queryString.get(props.slug)
      if (regexDistrict.test(urlValStr)) {
        let checkListArray = [];
        let ids = [];
        let urlValArray = urlValStr.split(',');
        urlValArray.forEach((val) => {
          let inItemsArray = props.itemsList.filter(item => item.id === parseInt(val))
          if (inItemsArray.length === 1 && !checkListArray.includes((parseInt(val)))) {
            checkListArray.push(inItemsArray[0])
            ids.push(parseInt(inItemsArray[0].id))
          }
        })

        // setSelectedFilters({ list: checkListArray, ids: ids, initIds: ids })

        setSelectedFilters({ list: checkListArray, ids })
      } else {
        setSelectedFilters({ list: [], ids: [] })
      }
    } else {
      setSelectedFilters({ list: [], ids: [] })
    }
  }, [filterParam])

  const checkHandler = (id, title = "") => {

    let selected = { ...selectedFilters }
    let index = selected.ids.findIndex(item => item === id)

    if (index > -1) {
      selected.ids.splice(index, 1)
      let objIndex = selected.list.findIndex(city => city.id == id)
      selected.list.splice(objIndex, 1)
    } else {
      selected.ids.push(id)
      let newObj = { id, title }
      selected.list.push(newObj)
    }


    // { init: [], updated: { list: [], ids: [] } }
    setSelectedFilters(selected)
    // setSelectedFilters({ init: [], updated: { list: [], ids: [] } })
  }

  const searchHandler = txt => {

    let allList = [...props.itemsList]
    if (txt.length > 1) {
      let filtered = allList.filter((item) => {
        if (item.title.indexOf(txt) > -1) {
          return item
        }
      })
      // setShowList({ type: "search", list: filteredCities })
      setListShow(filtered)
    } else {
      // if (showList.type != "parent") {
      //     setShowList({ type: "parent", list: provinceObj })
      // }
      setListShow([...props.itemsList])
    }
    setSearchVal(txt)
  }

  const urlMakerWithDistricts = (ids) => {

    let currentValueString = ids.join(",");
    setQueryString(params => {
      params.set(props.slug, currentValueString)
      if (currentValueString === '') {
        params.delete(props.slug)
      } else {
        params.set(props.slug, currentValueString)
      }
      return params
    })

  }


  const submitFilter = () => {
    urlMakerWithDistricts(selectedFilters.ids);
    handleOpen()
  }

  return (
    <>
      <div className="w-full p-2  border-t-2 border-gray-100 py-4">

        <h6 className="mb-4 text-16 font-bold text-pink-500 px-2">{props.title}</h6>

        <div className="relative flex justify-between text-sm text-blue-gray-400 cursor-text items-center border-2 rounded-md border-gray-200 pl-2"
        >

          {mahaleNumber > 0 ? (<div className='w-6 h-8 flex  pr-2 items-center'>
            <FiX className={` ${mahaleNumber === 0 ? "hidden" : ""} cursor-pointer text-blue-gray-900 z-50 text-16 font-bold`} onClick={() => urlMakerWithDistricts([])} />
          </div>) : null}

          <div className='flex gap-2 items-center justify-between flex-grow py-2 pr-2' onClick={handleOpen}>

            <span className='' >
              {mahaleNumber === 0 ? " تعیین " + props.title : mahaleNumber + " " + props.title}
            </span>
            <FiChevronLeft />
          </div>
        </div>

      </div>


      <Dialog open={modalOpen} handler={handleOpen}
        size={window.innerWidth < 768 ? "xxl" : "sm"}
        className={`flex flex-col gap-2 ${window.innerWidth > 768 ? "max-h-[90vh]" : ""}`}
      >


        <div className="flex flex-col justify-center gap-4 shrink-0 p-4 ">

          <h3 className='text-blue-gray-900 antialiased font-sans text-2xl font-semibold leading-snug'>انتخاب محل</h3>

          <p className={`${selectedFilters.ids.length === 0 ? "hidden" : "block"} float-end absolute left-2 top-5 mb-3 ml-2 text-11 cursor-pointer text-red-700 hover:bg-blue-gray-50 px-2 py-1 rounded-lg `}
            onClick={clearChecked}
          >حذف همه</p>


          <div className={`w-full ${selectedFilters.ids.length > 0 ? "h-12" : "h-2"} overflow-x-scroll overflow-y-hidden flex gap-3 list-scroll`}>

            {selectedFilters.list.map((item, key) => {
              return (
                <span className='px-2 py-1 bg-red-100 gap-2 flex items-center justify-center rounded-lg'>
                  <p className='text-red-900 whitespace-nowrap' >{item.title}</p>
                  <span className='w-5 h-5 flex  justify-center items-center  rounded-full transition hover:bg-brown-100 cursor-pointer'>
                    <IoIosClose className='text-red-900 text-lg'
                      onClick={() => checkHandler(item.id)}
                    />
                  </span>
                </span>
              )
            })}



            {/* <span className='p-2 bg-red-100 gap-2 flex items-center justify-center rounded-lg'>
        <p className='text-red-900' >شیراز</p>
        <span className='w-5 h-5 flex  justify-center items-center  rounded-full transition hover:bg-brown-100 cursor-pointer'>
            <IoIosClose className='text-red-900 text-lg' />
        </span>
    </span> */}

          </div>


          <input type='text'
            className='p-2 px-3 border-2 border-gray-100 rounded-md focus:outline-gray-300 transition'
            placeholder='نام محله را وارد کنید..'
            value={searchVal}
            onChange={(e) => searchHandler(e.target.value)}
          />
        </div>



        <DialogBody className='flex-1 overflow-y-scroll modal-scroll'>

          <List key={5} className=''>
            {listShow.map((item) => {
              return (
                <ListItem key={item.id} className="flex py-0 justify-between items-center"
                  onClick={(e) => checkHandler(item.id, item.title)}
                >
                  <p>{item.title}</p>

                  <Checkbox color="pink" checked={selectedFilters.ids.includes(item.id) ? true : false}
                    onChange={(e) => ({})}
                  />
                </ListItem>
              )
            })}
          </List>

        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="ml-1"
          >
            <span>بی خیال</span>
          </Button>
          <Button variant="gradient" color="green" onClick={submitFilter}
            disabled={prevIdsParams === selectedFilters.ids.sort().join("") ? true : false}
          >
            <span>تایید</span>
          </Button>
        </DialogFooter>


      </Dialog>

    </>
  );
}

export default DistrictFilter;