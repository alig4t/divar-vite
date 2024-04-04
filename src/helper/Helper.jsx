
import CatList from "../JsonFiles/Catlist.json"
import CityList from "../components/CityModal/cities.json"


const regexStr = /(^\d+(\,\d+)*$)/
const regexHash = /(^\d+(\%2C\d+)*$)/


export const URLMakerWithHash = (hash, cat) => {
    let catPath = cat === '' || cat == undefined ? "" : "/" + cat;
    return `/s/iran${catPath}?cities=${hash}`
}


export const checkValidCat = slug => {
    if (slug === '' || slug === undefined) return [true, { slug: "" }]
    let objCat = CatList.filter(item => item.slug === slug)
    if (objCat.length > 0) {
        return [true, objCat[0]]
    }
    return [false, { slug: "" }]
}

export const format = (input) => {
    var nStr = input + '';
    nStr = nStr.replace(/\,/g, "");
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    input = x1 + x2;
    return input
}

export const navToLocalStorageCity = () => {
    let prevCities = localStorage.getItem('lastCities')
    let decodePrev = "301"
    try {
        decodePrev = decodeURIComponent(prevCities)
    } catch (error) {
    }
    let spl = decodePrev.split(",")
    let validArray = []
    let ids = []
    spl.forEach((idCity) => {

        let cityObj = CityList.find((item) => item.id === Number(idCity))
        if (cityObj != undefined) {

            ids.push(cityObj.id)
            validArray.push(cityObj)
        }
    })
    let url = ""
    // if (validArray.length > 1) {
    //     url = "/s/iran?cities=" + ids.join("%2C")
    // } else {
    //     url = "/s/" + validArray[0].slug
    // }

    if (validArray.length > 1) {
        url = "/s/iran?cities=" + ids.join("%2C")
    } else if (validArray.length === 1) {
        url = "/s/" + validArray[0].slug
    } else {
        url = "/s/" + "tehran"
        ids = [113]
        validArray = [{
            "id": 301,
            "title": "تهران",
            "slug": "tehran",
            "province_id": 8
        }]
    }


    let idsStr = (ids.sort()).join("");
    return [url, validArray, ids, idsStr]
}



export const navToLocalCityAndCat = () => {
    let prevCityHash = localStorage.getItem("lastCities");
    let prevCat = localStorage.getItem("catSlug");
    let url = '/'
    if (prevCityHash !== null && prevCityHash !== "" && regexHash.test(prevCityHash)) {
        url = URLMakerWithHash(prevCityHash, prevCat);
    }
    return url
}


export const checkValidCities = (city, hasCities) => {


    let ids = [];
    let validAddress = true;
    let validUrl = true
    let cityListArray = []

    if (city === "iran") {
        let isRegexValid = regexStr.test(String(hasCities))
        if (hasCities.length > 0 && isRegexValid) {
            let citiesIdsString = hasCities;
            let citiesIdsArray = citiesIdsString.split(",");
            citiesIdsArray.forEach(id => {
                let cityObj = CityList.find((item) => item.id === Number(id))
                if (cityObj === undefined || cityObj.parent === 0) {
                    validAddress = false;
                } else {
                    cityListArray.push(cityObj)
                    ids.push(Number(id))
                }
            });
            if (cityListArray.length === 0) {
                validUrl = false
            }
        } else {
            validUrl = false
        }
    } else {
        let singleCityObj = CityList.find((item) => item.slug === city)
        if (singleCityObj === undefined) {
            validUrl = false;
        } else {
            ids.push(singleCityObj.id)
            cityListArray.push(singleCityObj)
        }
    }

    return ([validUrl, cityListArray, ids])
}


export const getBreadCrumbs = slug => {
    let bread = []
    let catObj = CatList.find((item) => item.slug === slug)

    while (catObj.parent !== 0) {
        bread.push(catObj)
        catObj = CatList.find((item) => item.id === catObj.parent)
    }
    bread.push(catObj)

    console.log(bread);

    return bread.reverse()

}

const now = new Date()
const nowTime = now.getTime()

export const showDate = (createTime) => {

    let timeObj = new Date(createTime)

    let time = Math.floor((nowTime - timeObj.getTime()) / 1000)

    let str = ""
    let hour = Math.floor(time / 3600)

    switch (true) {
        case hour == 0:
            str = "دقایقی پیش"
            break;
        case 0 < hour && hour < 24:
            str = hour + " ساعت پیش "
            break;
        case 24 < hour && hour < 168:
            str = Math.floor(hour / 24) + " روز پیش "
            break;
        case 168 < hour && hour < 720:
            str = Math.floor(hour / 168) + " هفته پیش "
            break;
        case 720 < hour:
            str = Math.floor(hour / 720) + " ماه پیش "
            break;
    }
    
    return str
}