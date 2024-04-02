
import React, { useEffect, useState } from 'react';
// import { createClient } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom';
import CityList from "../../components/CityModal/cities.json"
import { navToLocalStorageCity } from '../../helper/Helper';
// const supabase = createClient(
//   "https://qbaacnllyoyhtndgcvvs.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiYWFjbmxseW95aHRuZGdjdnZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwMzkzMDEsImV4cCI6MjAyNjYxNTMwMX0.X-TRkyMuNPlvG6jr6-yxK5RHvlnJgVyyCRO3OK6QpT8"
// )

const SelectCity = () => {

  const navigate = useNavigate()

  useEffect(() => {
    let [url] = navToLocalStorageCity()
    navigate(url)
  }, [])


}

export default SelectCity;