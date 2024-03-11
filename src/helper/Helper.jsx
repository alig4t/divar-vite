
import CatList from "../JsonFiles/Catlist.json"

export const URLMakerWithHash = (hash, cat) => {
    let catPath = cat === '' || cat == undefined ? "" : "/" + cat;
    return `/s/iran${catPath}?cities=${hash}`
}


export const checkValidCat = slug => {
    if (slug === '' || slug === undefined) return [true, {slug:""}]
    let objCat = CatList.filter(item => item.slug === slug)
    if (objCat.length > 0){
        return [true,objCat[0]]
    }
    return [false,{slug:""}]
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