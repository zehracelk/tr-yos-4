// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import ImageSection from "../components/departmentComponents/ImageSection";
import Selections from "../components/departmentComponents/Selections";
import PriceForm from "../components/departmentComponents/PriceForm";
import "../components/departmentComponents/departments.css";
import Hamburger from "hamburger-react";
import { useState } from "react";
import useInfoCalls from "../hooks/useInfoCalls";
import { useSelector } from "react-redux";
import OneCard from '../components/card/OneCard'
// eslint-disable-next-line no-unused-vars
import i18next, { t } from "i18next";
import axios from "axios";
function Departments() {
  const { getAllDepartments, getUserInfo } = useInfoCalls();
  const { allDepartments } = useSelector((state) => state.info);
  const { currentUser } = useSelector((state) => state?.auth);
  const [isOpen, setOpen] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [favouriteList, setFavouriteList] = useState([]);

  useEffect(() => {
    getAllDepartments();
    currentUser &&  getUserInfo(currentUser?.userID); 
  }, [currentUser]);

  const department = allDepartments?.slice(0, 51)

  const moveToSelectedDepartments = (id) => {
    const currentUserId = currentUser.userID;
    const departmentId = id

    try {
      axios.get(`https://tr-yös.com/api/v1/users/addcompare.php?id=${departmentId}&user_id=${currentUserId}&token=KE4ekFg1YPngkIbjMP/5JdBtisNVE076kWUW7TPz8iGaHT8te/i2nrAycAGnwAL5ZRitK5Rb4VwDp6JEfab5b0d5dfc31a7d39edf5370b8a067a`);
    }
    catch (error) {
      console.log(error);
    }
    setCompareList((prevState) => [...prevState, departmentId]);
    console.log(compareList)
  }

  const removeFromSelectedDepartments = (id) => {
    const currentUserId = currentUser.userID;
    const departmentId = id

    try {
      axios.get(`https://tr-yös.com/api/v1/users/deletecompare.php?id=${departmentId}&user_id=${currentUserId}&token=KE4ekFg1YPngkIbjMP/5JdBtisNVE076kWUW7TPz8iGaHT8te/i2nrAycAGnwAL5ZRitK5Rb4VwDp6JEfab5b0d5dfc31a7d39edf5370b8a067a`);
    } catch (error) {
      console.log(error);
    }
    setCompareList(prevState => prevState.filter((item) => item !== departmentId));
    console.log(compareList);
  }

  //Add to Favourites///

  const moveToFavourites = (id) => {

    const currentUserId = currentUser.userID;
    const departmentId = id

    try {
      axios.get(`https://tr-yös.com/api/v1/users/addfavorite.php?id=${departmentId}&user_id=${currentUserId}&token=KE4ekFg1YPngkIbjMP/5JdBtisNVE076kWUW7TPz8iGaHT8te/i2nrAycAGnwAL5ZRitK5Rb4VwDp6JEfab5b0d5dfc31a7d39edf5370b8a067a`);
    }
    catch (error) {
      console.log(error);
    }
    setFavouriteList(prevState => [...prevState, departmentId]);
    console.log(favouriteList)

  }

  const removeFromFavourites = (id) => {
    const currentUserId = currentUser.userID;
    const departmentId = id

    try {
      axios.get(`https://tr-yös.com/api/v1/users/deletefavorite.php?id=${departmentId}&user_id=${currentUserId}&token=KE4ekFg1YPngkIbjMP/5JdBtisNVE076kWUW7TPz8iGaHT8te/i2nrAycAGnwAL5ZRitK5Rb4VwDp6JEfab5b0d5dfc31a7d39edf5370b8a067a`);
    } catch (error) {
      console.log(error);
    }

    console.log(favouriteList);
  }


  return (
    <>
      <div className="flex flex-col">
        <ImageSection />
        <div className="xs:flex-col xs:justify-center xs:items-center md:flex md:flex-row md:justify-center md:items-start">
          <div className="xs:visible xs:flex xs:justify-center xs:items-center sm:visible md:hidden">
            <button>

              <Hamburger
                label="show menu"
                toggled={isOpen}
                toggle={setOpen}

                direction="right"
              />
              {
                isOpen && (
                  <div className="md:visible md:flex md:flex-row md:justify-center md:items-center md:ml-3">
                    <form
                      method="POST"
                      className="border shadow-lg md:mt-36 rounded-lg "
                    >
                      <Selections />
                      <PriceForm />

                      <div className="flex flex-row mx-2 justify-end xs:justify-start xs:mx-0  sm:justify-start md:justify-end departments_search_button_container">
                        <button
                          className="sm:mx-0 block xs:float-left float-right bg-red-warm m-2 w-1/4 py-1 rounded-md text-white departments_search_button md:px-auto md:w-full"
                          name="searchDepartments"
                          type="submit"
                        >
                          {t("Search")}
                        </button>
                      </div>
                    </form>
                  </div>
                )
              }

            </button>
          </div>
          <div className="xs:hidden sm:hidden md:visible md:flex md:flex-row md:justify-center md:items-center md:ml-3">
            <form
              method="POST"
              className="border shadow-lg md:mt-36 rounded-lg "
            >
              <Selections />
              <PriceForm />
              <div className="flex flex-row mx-2 justify-end sm:justify-start md:justify-end departments_search_button_container">
                <button
                  className="block float-right bg-red-warm m-2 w-1/4 py-1 rounded-md text-white departments_search_button md:px-auto md:w-full"
                  name="searchDepartments"
                  type="submit"
                >
                  {t("Search")}
                </button>
              </div>
            </form>
          </div>
          <div className="xs:flex xs:flex-col xs:justify-center xs:items-center sm:flex sm:flex-col sm:justify-center sm:items-center md:px-0">
            <div className="row mt-16 justify-center-center">
              <div className="sec-heading center">
                <h2 className="font-extrabold text-2xl">{t("Our Departments")}</h2>
                <p>{t("Our Departments")} {t("Our Departments")} {t("Our Departments")}...</p>
              </div>
            </div>
            <div className="xs:m-0 xs:px-0 sm:m-0 sm:px-0 sm:w-full grid grid-cols-1 md:grid-cols-2 md:px-4 lg:grid-cols-3">

              {
                department?.map((item) =>
                  <div key={item.id}>

                    <OneCard item={item}
                      facultyTr={item.faculty.tr}
                      facultyEn={item.faculty.en}
                      universityTr={item.university.tr}
                      universityEn={item.university.en}
                      departmentTr={item.department.tr}
                      departmentEn={item.department.en}
                      cityTr={item.city.tr}
                      cityEn={item.city.en}
                      code={item.department.code}
                      price={item.price}
                      id={item.id}
                      moveToSelectedDepartments={moveToSelectedDepartments}
                      removeFromSelectedDepartments={removeFromSelectedDepartments}
                      moveToFavourites={moveToFavourites}
                      removeFromFavourites={removeFromFavourites}
                      isInCompare={compareList.includes(item.id)}
                      isInFavourite={favouriteList.includes(item.id)}
                    />
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}


export default Departments;




//Çalışan Versiyon///////////

// eslint-disable-next-line no-unused-vars
// import React, { useEffect } from "react";
// import ImageSection from "../components/departmentComponents/ImageSection";
// import Selections from "../components/departmentComponents/Selections";
// import PriceForm from "../components/departmentComponents/PriceForm";
// import "../components/departmentComponents/departments.css";
// import Hamburger from "hamburger-react";
// import { useState } from "react";
// import useInfoCalls from "../hooks/useInfoCalls";
// import { useSelector } from "react-redux";
// import OneCard from '../components/card/OneCard'
// // eslint-disable-next-line no-unused-vars
// import i18next, { t } from "i18next";
// import axios from "axios";
// function Departments() {
//   const { getDepartments, getCities, getUserInfo } = useInfoCalls();
//   const { departments, cities, userInfo } = useSelector((state) => state.info);
//   const { currentUser } = useSelector((state) => state?.auth);
//   const [isOpen, setOpen] = useState(false);
//   const [compareList, setCompareList] = useState([]);

//   useEffect(() => {
//     getDepartments();
//     getCities();
//     getUserInfo();
//   }, []);

//   const department = departments?.slice(0, 51)


//   // const getUniById= uniById?.slice(200,-1)
//   console.log(departments);

//   console.log(cities);

//   const moveToSelectedDepartments = (id) => {
//     const currentUserId = currentUser.userID;
//     const departmentId = id
//     alert(departmentId)
//     try {
//       axios.get(`https://tr-yös.com/api/v1/users/addcompare.php?id=${departmentId}&user_id=${currentUserId}&token=KE4ekFg1YPngkIbjMP/5JdBtisNVE076kWUW7TPz8iGaHT8te/i2nrAycAGnwAL5ZRitK5Rb4VwDp6JEfab5b0d5dfc31a7d39edf5370b8a067a`);
//     }
//     catch (error) {
//       console.log(error);
//     }
//     setCompareList(prevState => [...prevState, departmentId]);
//     console.log(compareList)
//   }

//   const removeFromSelectedDepartments = (id) => {
//     const currentUserId = currentUser.userID;
//     const departmentId = id
//     alert(departmentId)
//     try {
//       axios.get(`https://tr-yös.com/api/v1/users/deletecompare.php?id=${departmentId}&user_id=${currentUserId}&token=KE4ekFg1YPngkIbjMP/5JdBtisNVE076kWUW7TPz8iGaHT8te/i2nrAycAGnwAL5ZRitK5Rb4VwDp6JEfab5b0d5dfc31a7d39edf5370b8a067a`);
//     } catch (error) {
//       console.log(error);
//     }
//     setCompareList(prevState => prevState.filter((item) => item !== departmentId));
//     console.log(compareList);
//   }

//   return (
//     <>
//       <div className="flex flex-col">
//         <ImageSection />

//         {/*  */}

//         <div className="xs:flex-col xs:justify-center xs:items-center md:flex md:flex-row md:justify-center md:items-start">
//           <div className="xs:visible xs:flex xs:justify-center xs:items-center sm:visible md:hidden">
//             <button>

//               <Hamburger
//                 label="show menu"
//                 toggled={isOpen}
//                 toggle={setOpen}

//                 direction="right"
//               />
//               {
//                 isOpen && (
//                   <div className="md:visible md:flex md:flex-row md:justify-center md:items-center md:ml-3">
//                     <form
//                       method="POST"
//                       className="border shadow-lg md:mt-36 rounded-lg "
//                     >
//                       <Selections />
//                       <PriceForm />

//                       <div className="flex flex-row mx-2 justify-end xs:justify-start xs:mx-0  sm:justify-start md:justify-end departments_search_button_container">
//                         <button
//                           className="sm:mx-0 block xs:float-left float-right bg-red-warm m-2 w-1/4 py-1 rounded-md text-white departments_search_button md:px-auto md:w-full"
//                           name="searchDepartments"
//                           type="submit"
//                         >
//                           {t("Search")}
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 )
//               }

//             </button>
//           </div>
//           <div className="xs:hidden sm:hidden md:visible md:flex md:flex-row md:justify-center md:items-center md:ml-3">
//             <form
//               method="POST"
//               className="border shadow-lg md:mt-36 rounded-lg "
//             >


//               <Selections />
//               <PriceForm />
//               {/*

//               {
//                 cities?.map((item) =>
//                   <div key={item.id}>
//                     <Selections item={item} />
//                     <PriceForm />
//                   </div>
//                 )
//               } */}

//               <div className="flex flex-row mx-2 justify-end sm:justify-start md:justify-end departments_search_button_container">
//                 <button
//                   className="block float-right bg-red-warm m-2 w-1/4 py-1 rounded-md text-white departments_search_button md:px-auto md:w-full"
//                   name="searchDepartments"
//                   type="submit"
//                 >
//                   {t("Search")}
//                 </button>
//               </div>
//             </form>


//           </div>
//           <div className="xs:flex xs:flex-col xs:justify-center xs:items-center sm:flex sm:flex-col sm:justify-center sm:items-center md:px-0">
//             <div className="row mt-16 justify-center-center">
//               <div className="sec-heading center">
//                 <h2 className="font-extrabold text-2xl">{t("Our Departments")}</h2>
//                 <p>{t("Our Departments")} {t("Our Departments")} {t("Our Departments")}...</p>
//               </div>
//             </div>
//             <div className="xs:m-0 xs:px-0 sm:m-0 sm:px-0 sm:w-full grid grid-cols-1 md:grid-cols-2 md:px-4 lg:grid-cols-3">

//               {
//                 department?.map((item) =>
//                   <div key={item.id}>
//                     <OneCard
//                       facultyCode={item.facultyCode}
//                       en={item.en}
//                       tr={item.tr}
//                       item={item}
//                       id={item.id}
//                       moveToSelectedDepartments={moveToSelectedDepartments}
//                       removeFromSelectedDepartments={removeFromSelectedDepartments}
//                       isInCompare={compareList.includes(item.id)}
//                     />
//                   </div>
//                 )}
//             </div>
//           </div>
//         </div>
//       </div>

//     </>
//   );
// }


// export default Departments;

//////Çalışan Versiyon////


/**Kısmen çalışan versiyon
 * 
 * //
 * import ImageSection from "../components/departmentComponents/ImageSection";
import Selections from "../components/departmentComponents/Selections";
import PriceForm from "../components/departmentComponents/PriceForm";
import "../components/departmentComponents/departments.css";
import Hamburger from "hamburger-react";
import { useState } from "react";
import useInfoCalls from "../hooks/useInfoCalls";
import { useSelector } from "react-redux";
import OneCard from '../components/card/OneCard'
// eslint-disable-next-line no-unused-vars
import i18next, { t } from "i18next";
function Departments(item, facultyCode, en, tr, id) {
  const { getDepartments, getCities } = useInfoCalls();
  const { departments, cities } = useSelector((state) => state.info);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    getDepartments();
    getCities();
  }, []);

  const department = departments?.slice(0, 51)


  // const getUniById= uniById?.slice(200,-1)
  console.log(department);

  console.log(cities);

  return (
    <>
      <div className="flex flex-col">
        <ImageSection />

        {/*  

        <div className="xs:flex-col xs:justify-center xs:items-center md:flex md:flex-row md:justify-center md:items-start">
          <div className="xs:visible xs:flex xs:justify-center xs:items-center sm:visible md:hidden">
            <button>

              <Hamburger
                label="show menu"
                toggled={isOpen}
                toggle={setOpen}

                direction="right"
              />
              {
                isOpen && (
                  <div className="md:visible md:flex md:flex-row md:justify-center md:items-center md:ml-3">
                    <form
                      method="POST"
                      className="border shadow-lg md:mt-36 rounded-lg "
                    >
                      <Selections />
                      <PriceForm />

                      <div className="flex flex-row mx-2 justify-end xs:justify-start xs:mx-0  sm:justify-start md:justify-end departments_search_button_container">
                        <button
                          className="sm:mx-0 block xs:float-left float-right bg-red-warm m-2 w-1/4 py-1 rounded-md text-white departments_search_button md:px-auto md:w-full"
                          name="searchDepartments"
                          type="submit"
                        >
                          {t("Search")}
                        </button>
                      </div>
                    </form>
                  </div>
                )
              }

            </button>
          </div>
          <div className="xs:hidden sm:hidden md:visible md:flex md:flex-row md:justify-center md:items-center md:ml-3">
            <form
              method="POST"
              className="border shadow-lg md:mt-36 rounded-lg "
            >


              <Selections />
              <PriceForm />
              {/* 

              {
                cities?.map((item) =>
                  <div key={item.id}>
                    <Selections item={item} />
                    <PriceForm />
                  </div>
                )
              } 

              <div className="flex flex-row mx-2 justify-end sm:justify-start md:justify-end departments_search_button_container">
                <button
                  className="block float-right bg-red-warm m-2 w-1/4 py-1 rounded-md text-white departments_search_button md:px-auto md:w-full"
                  name="searchDepartments"
                  type="submit"
                >
                  {t("Search")}
                </button>
              </div>
            </form>


          </div>
          <div className="xs:flex xs:flex-col xs:justify-center xs:items-center sm:flex sm:flex-col sm:justify-center sm:items-center md:px-0">
            <div className="row mt-16 justify-center-center">
              <div className="sec-heading center">
                <h2 className="font-extrabold text-2xl">{t("Our Departments")}</h2>
                <p>{t("Our Departments")} {t("Our Departments")} {t("Our Departments")}...</p>
              </div>
            </div>
            <div className="xs:m-0 xs:px-0 sm:m-0 sm:px-0 sm:w-full grid grid-cols-1 md:grid-cols-2 md:px-4 lg:grid-cols-3">

              {
                department?.map((item) =>
                  <div key={item.id}>
                    <OneCard
                      facultyCode={item.facultyCode}
                      en={item.en}
                      tr={item.tr}
                      item={item}
                    />
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}


export default Departments;

//////////////////////////







// // eslint-disable-next-line no-unused-vars
// import React, { useEffect } from "react";
// import ImageSection from "../components/departmentComponents/ImageSection";
// import Selections from "../components/departmentComponents/Selections";
// import PriceForm from "../components/departmentComponents/PriceForm";
// import "../components/departmentComponents/departments.css";
// import Hamburger from "hamburger-react";
// import { useState } from "react";
// import useInfoCalls from "../hooks/useInfoCalls";
// import { useSelector } from "react-redux";
// import OneCard from '../components/card/OneCard'
// // eslint-disable-next-line no-unused-vars
// import i18next, { t } from "i18next";



// function Departments() {
//   const { getDepartments, getCities } = useInfoCalls();
//   const { departments, cities } = useSelector((state) => state.info);
//   const [isOpen, setOpen] = useState(false);

//   useEffect(() => {
//     getDepartments();
//     getCities();
//   }, []);

// const department = departments?.slice(0, 51 )


//   // const getUniById= uniById?.slice(200,-1)
//   console.log(departments);

//   console.log(cities);

//   return (
//     <>
//       <div className="flex flex-col">
//         <ImageSection />

//         {/*  

//         <div className="xs:flex-col xs:justify-center xs:items-center md:flex md:flex-row md:justify-center md:items-start">
//           <div className="xs:visible xs:flex xs:justify-center xs:items-center sm:visible md:hidden">
//             <button>

//               <Hamburger
//                 label="show menu"
//                 toggled={isOpen}
//                 toggle={setOpen}

//                 direction="right"
//               />
//               {
//                 isOpen && (
//                   <div className="md:visible md:flex md:flex-row md:justify-center md:items-center md:ml-3">
//                     <form
//                       method="POST"
//                       className="border shadow-lg md:mt-36 rounded-lg "
//                     >
//                       <Selections />
//                       <PriceForm />

//                       <div className="flex flex-row mx-2 justify-end xs:justify-start xs:mx-0  sm:justify-start md:justify-end departments_search_button_container">
//                         <button
//                           className="sm:mx-0 block xs:float-left float-right bg-red-warm m-2 w-1/4 py-1 rounded-md text-white departments_search_button md:px-auto md:w-full"
//                           name="searchDepartments"
//                           type="submit"
//                         >
//                           {t("Search")}
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 )
//               }

//             </button>
//           </div>
//           <div className="xs:hidden sm:hidden md:visible md:flex md:flex-row md:justify-center md:items-center md:ml-3">
//             <form
//               method="POST"
//               className="border shadow-lg md:mt-36 rounded-lg "
//             >


//               <Selections />
//               <PriceForm />
//               {/*

//               {
//                 cities?.map((item) =>
//                   <div key={item.id}>
//                     <Selections item={item} />
//                     <PriceForm />
//                   </div>
//                 )
//               } 

//               <div className="flex flex-row mx-2 justify-end sm:justify-start md:justify-end departments_search_button_container">
//                 <button
//                   className="block float-right bg-red-warm m-2 w-1/4 py-1 rounded-md text-white departments_search_button md:px-auto md:w-full"
//                   name="searchDepartments"
//                   type="submit"
//                 >
//                   {t("Search")}
//                 </button>
//               </div>
//             </form>


//           </div>
//           <div className="xs:flex xs:flex-col xs:justify-center xs:items-center sm:flex sm:flex-col sm:justify-center sm:items-center md:px-0">
//             <div className="row mt-16 justify-center-center">
//               <div className="sec-heading center">
//                 <h2 className="font-extrabold text-2xl">{t("Our Departments")}</h2>
//                 <p>{t("Our Departments")} {t("Our Departments")} {t("Our Departments")}...</p>
//               </div>
//             </div>
//             <div className="xs:m-0 xs:px-0 sm:m-0 sm:px-0 sm:w-full grid grid-cols-1 md:grid-cols-2 md:px-4 lg:grid-cols-3">

//               {
//                 department?.map((item) =>
//                   <div key={item.id}>
//                     <OneCard item={item}
//                     departmentId={item.id}
//                      />
//                   </div>
//                 )}
//             </div>
//           </div>
//         </div>
//       </div>

//     </>
//   );
// }


// export default Departments;

*/
