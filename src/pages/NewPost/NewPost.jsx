import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FiChevronLeft, FiUploadCloud } from 'react-icons/fi';
import { Button, Input, Option, Select, Textarea } from '@material-tailwind/react';
import { useDropzone } from 'react-dropzone';

import WithAuthCheck from '../../components/HOC/WithAuthCheck';
import CatList from "../../JsonFiles/Catlist.json";
import Provinces from "../../components/CityModal/provinces.json";
import CityList from "../../components/CityModal/cities.json";
import AllFilters from "../../JsonFiles/AllFilters.json";
import NewPostLayout from '../../components/Layout/NewPostLayout';
import { makeCodePost } from '../../helper/Helper';
import apiService from '../../config';

const CatParents = [
  { "id": 14, "slug": "real-estate", "title": "املاک", "parent": 0, "icon": "house-svgrepo-com (3).svg", "hasChildren": true },
  { "id": 15, "slug": "vehicles", "title": "وسایل نقلیه", "parent": 0, "icon": "car-svgrepo-com (2).svg", "hasChildren": true },
  { "id": 16, "slug": "electronic-devices", "title": "کالای دیجیتال", "parent": 0, "icon": "smartphone-svgrepo-com.svg", "hasChildren": true },
  { "id": 17, "slug": "home-kitchen", "title": "خانه و آشپزخانه", "parent": 0, "icon": "oven-svgrepo-com.svg", "hasChildren": true },
  { "id": 19, "slug": "personal-goods", "title": "وسایل شخصی", "parent": 0, "icon": "smartwatch-svgrepo-com.svg", "hasChildren": true },
];

const states = [
  { "id": 12, "title": "آجودانیه", "city": 113, "neighbours": "سباری، موحد دانش، منجیل" },
  { "id": 13, "title": "آذربایجان", "city": 113, "neighbours": "کلهر، آذربایجان، رودکی، آزادی" },
  { "id": 14, "title": "اختیاریه", "city": 113, "neighbours": "اختیاریه شمالی، دیباجی جنوبی، کلاهدوز، پاسداران، منظریه، جهانتاب، کاوه، سنجابی" },
  { "id": 15, "title": "تهران‌ویلا", "city": 113, "neighbours": "امام منتظر، ستارخان، منصوری کیا" },
  { "id": 16, "title": "قیطریه", "city": 113, "neighbours": "قیطریه، اندرزگو، صبا، کاوه، پل رومی، شریعتی، سبحان، سهیل، بهار شمالی، صدر، قلندری شمالی، صدر، قیطریه" },
  { "id": 31, "title": "باغ نگار", "city": 132, "neighbours": "هفت دست، فیض" },
  { "id": 32, "title": "بهاران", "city": 132, "neighbours": "" },
  { "id": 43, "title": "فرهنگ", "city": 132, "neighbours": "باغ زیار، سهروردی، کشاورز" },
  { "id": 53, "title": "گیشا", "city": 132, "neighbours": "باغ زیار، سهروردی، کشاورز" },
  { "id": 63, "title": "مولوی", "city": 132, "neighbours": "باغ زیار، سهروردی، کشاورز" },
  { "id": 73, "title": "سعادت آباد", "city": 132, "neighbours": "باغ زیار، سهروردی، کشاورز" },
  { "id": 83, "title": "جمهوری", "city": 132, "neighbours": "باغ زیار، سهروردی، کشاورز" }
];

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const NewPost = (props) => {
  const [queryString] = useSearchParams();
  const [listShow, setListShow] = useState([]);
  const [cat, setCat] = useState(null);
  const [form, setForm] = useState([]);
  const navigate = useNavigate();
  const [inserting, setInserting] = useState(false);

  const catSlug = queryString.get('slug');

  const [provinceOptions, setProvinceOptions] = useState(0);
  const [cityOptions, setCityOptions] = useState([]);
  const [mahalOptions, setMahalOptions] = useState([]);
  const [cityVal, setCityVal] = useState("");
  const [mahalVal, setMahalVal] = useState("");
  const [errorForm, setErrorForm] = useState({});
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const parentSlug = catSlug || '';
    let list = {};
    let parentObj = {};
    
    if (parentSlug === '') {
      list = CatParents;
    } else {
      parentObj = CatList.find((item) => item.slug === parentSlug);
      list = CatList.filter((item) => item.parent === parentObj.id);
    }

    if (list.length === 0) {
      setCat(parentObj);
      setListShow([]);
      const catId = parentObj.id;
      const filters = AllFilters.find((item) => {
        if (item.catId.includes(catId)) {
          return item;
        }
      });

      let form = [];
      form.push({ type: "input", title: "عنوان آگهی", value: "", show: "title" });
      if (filters?.supa) {
        Object.keys(filters.supa).forEach((key) => {
          filters.supa[key].forEach(element => {
            form.push({ ...element, value: "", show: key });
          });
        });
      }
      form.push({ type: "textarea", title: "توضیحات آگهی", value: "", show: "desc" });
      setForm(form);
    } else {
      setListShow(list);
      setCat(null);
    }
  }, [catSlug]);

  const clearCat = () => {
    setCat({});
    navigate('/new');
  };

  const proHandler = (e) => {
    setProvinceOptions(e);
    const getCities = CityList.filter((item) => item.province_id === Number(e));
    setCityOptions(getCities);
  };

  const cityHandler = (e) => {
    setCityVal(e);
    setMahalOptions(states);
  };

  const handleFormChange = (index, val) => {
    const prevForm = [...form];
    prevForm[index].value = val;
    setForm(prevForm);
  };

  async function uploadFile(file) {
    try {
      const result = await apiService.uploadFile('divarimg', 'images/' + makeCodePost() + "_" + file.name, file);
      return result.publicUrl;
    } catch (error) {
      console.error('Upload failed:', error);
      return null;
    }
  }

  async function insertPost() {
    setInserting(true);
    let emptyInput = false;
    const errorIndexs = { city: false, mahal: false, other: [] };
    
    if (cityVal === "") {
      errorIndexs.city = true;
    }
    if (mahalVal === "") {
      errorIndexs.mahal = true;
    }
    
    form.forEach((item, index) => {
      if (item.value === "") {
        emptyInput = true;
        errorIndexs.other.push(index);
      }
    });

    if (emptyInput || errorIndexs.city || errorIndexs.mahal) {
      setErrorForm(errorIndexs);
      setInserting(false);
      return;
    }

    try {
      const images = [];
      for (const file of files) {
        const uploadedUrl = await uploadFile(file);
        if (uploadedUrl) {
          images.push(uploadedUrl);
        }
      }

      const code = makeCodePost();
      const location = {
        city: cityVal,
        mahal: mahalVal
      };
      const title = form.find((item) => item.show === 'title').value;
      const desc = form.find((item) => item.show === 'desc').value;
      const postDetail = { featured: [], datas: [], price: [] };
      
      form.forEach((item) => {
        if ('isStatus' in item) {
          postDetail['status'] = { type: item.type, value: item.value, unit: item.unit };
        }
        switch (item.show) {
          case "featured":
            postDetail.featured.push({ "title": item.title, "value": item.value });
            break;
          case "datas":
            postDetail.datas.push({ "title": item.title, "value": item.value });
            break;
          case "price":
            postDetail.price.push({ "title": item.title, "value": item.value });
            break;
        }
      });

      const postData = {
        code,
        images,
        title,
        category: catSlug,
        postDetail,
        description: desc,
        location,
        author: props.user.id,
        created_at: new Date().toISOString()
      };

      await apiService.createPost(postData);
      navigate('/');
    } catch (error) {
      console.error('Post creation failed:', error);
      setInserting(false);
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          onLoad={() => { URL.revokeObjectURL(file.preview); }}
          alt="Preview"
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <NewPostLayout>
      <div className='w-full max-w-lg p-4'>
        <div className='border-b-2 border-pink-500 py-2'>
          <h2 className='font-bold'>ثبت آگهی</h2>
        </div>

        <div className='mt-5'>
          {cat ? (
            <>
              <div className='border-2 border-gray-200 p-6 rounded-md flex items-center justify-between'>
                <span className='font-bold'>{cat.title}</span>
                <Button color='cyan' onClick={clearCat}>
                  تغییر دسته بندی
                </Button>
              </div>

              <div className='my-6 flex flex-col gap-5'>
                <div className='flex gap-2'>
                  <Select 
                    size='lg' 
                    color="teal" 
                    label="انتخاب استان"
                    onChange={(e) => proHandler(e)}
                    className='min-w-[100px]'
                  >
                    {Provinces.map((item) => (
                      <Option key={item.id} value={String(item.id)}>{item.title}</Option>
                    ))}
                  </Select>
                  <Select 
                    size='lg' 
                    color='teal' 
                    label="انتخاب شهر" 
                    disabled={provinceOptions === 0}
                    className='min-w-16'
                    onChange={(e) => cityHandler(e)}
                    error={errorForm.city && cityVal === ""}
                  >
                    {cityOptions.map((city) => (
                      <Option key={city.id} value={city.title}>{city.title}</Option>
                    ))}
                  </Select>
                </div>

                <Select 
                  color='teal' 
                  label="انتخاب محل" 
                  disabled={mahalOptions.length === 0}
                  onChange={(e) => setMahalVal(e)}
                  error={errorForm.mahal && mahalVal === ""}
                >
                  {mahalOptions.map((mahal) => (
                    <Option key={mahal.id} value={mahal.title}>{mahal.title}</Option>
                  ))}
                </Select>

                {form.map((item, index) => {
                  switch (item.type) {
                    case "number":
                      return (
                        <div key={index} className="relative flex w-full">
                          <Input
                            type="number"
                            value={form[index].value}
                            label={item.title}
                            onChange={(e) => handleFormChange(index, e.target.value)}
                            className="pl-20"
                            containerProps={{ className: "min-w-0" }}
                            error={errorForm.other?.includes(index) && item.value === ""}
                          />
                          <Button
                            size="sm"
                            color="pink"
                            variant='text'
                            className="!absolute left-1 top-1 rounded"
                          >
                            {item.unit}
                          </Button>
                        </div>
                      );
                    case "select":
                      return (
                        <Select 
                          key={index}
                          label={item.title}
                          value={form[index].value}
                          onChange={(e) => handleFormChange(index, e)}
                          error={errorForm.other?.includes(index) && item.value === ""}
                        >
                          {item.valid.map((opt, index2) => (
                            <Option key={index2} value={String(opt)}>{opt}</Option>
                          ))}
                        </Select>
                      );
                    case "input":
                      return (
                        <Input 
                          key={index}
                          value={form[index].value} 
                          onChange={(e) => handleFormChange(index, e.target.value)} 
                          variant="outlined" 
                          size='lg' 
                          maxLength="70" 
                          color='teal' 
                          label={item.title}
                          error={errorForm.other?.includes(index) && item.value === ""}
                        />
                      );
                    case "textarea":
                      return (
                        <Textarea 
                          key={index}
                          value={form[index].value} 
                          variant="outlined" 
                          label={item.title}
                          onChange={(e) => handleFormChange(index, e.target.value)}
                          error={errorForm.other?.includes(index) && item.value === ""}
                        />
                      );
                    default:
                      return null;
                  }
                })}

                <div className='border-b-2 border-pink-500 py-2'>
                  <h2 className='font-bold'>تصاویر آگهی</h2>
                </div>

                <section className="container">
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p className='w-full flex flex-col justify-center items-center py-6 px-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm font-bold'>
                      <FiUploadCloud className='w-8 h-8 mb-3 text-gray-600' />
                      یک یا چند تصویر را انتخاب نمایید، یا عکس ها را اینجا بکشید و رها کنید
                    </p>
                  </div>
                  <aside style={thumbsContainer}>
                    {thumbs}
                  </aside>
                </section>

                <div className='w-full text-left'>
                  <Button 
                    color='green' 
                    className='max-w-44'
                    onClick={insertPost}
                    loading={inserting}
                  >
                    ثبت آگهی
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className='text-sm my-3'>انتخاب دسته بندی</p>
              {listShow?.map((item) => (
                <Link key={item.id} to={`/new?slug=${item.slug}`}>
                  <div className='flex justify-between border-b-2 border-gray-100 py-2 cursor-pointer'>
                    <span>{item.title}</span>
                    <FiChevronLeft />
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </NewPostLayout>
  );
};

export default WithAuthCheck(NewPost);