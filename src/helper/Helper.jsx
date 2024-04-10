
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


    console.log(hasCities);

    let ids = [];
    let validAddress = true;
    let validUrl = true
    let cityListArray = []

    if (city === "iran") {
        let isRegexValid = regexStr.test(String(hasCities))
        console.log(isRegexValid);
        
        if (hasCities && isRegexValid) {
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
        case hour < 1:
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

export function makeCodePost(length = 8) {
    let result = '';
    const onlyChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const onlyCharsLength = onlyChars.length;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    let counter = 0;
    result += onlyChars.charAt(Math.floor(Math.random() * onlyCharsLength));
    while (counter < length - 1) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    // console.log(result);
    return result;
}

export function getCatWithAllChildren(id, slug) {

    if (slug === ''){
        return []
    }
    let allSlug = [slug]
    let children = CatList.filter(item => item.parent === id)
    let children2 = []
    let children3 = []
    children.forEach((child) => {
        allSlug.push(child.slug)
        children2 = CatList.filter(item => item.parent === child.id)
        children2.forEach((child2) => {
            allSlug.push(child2.slug)

            children3 = CatList.filter(item => item.parent === child2.id)
            children3.forEach((child3) => {
                allSlug.push(child3.slug)
            })
        })
    })
    // console.log(allSlug);
    return allSlug
}