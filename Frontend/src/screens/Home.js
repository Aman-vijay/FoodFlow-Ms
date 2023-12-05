import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
// import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { SignalCellularConnectedNoInternet4BarRounded } from '@material-ui/icons'
import { data } from 'browserslist'
export default function Home() {
  const [foodCat, setFoodCat] = useState([])
  const [foodItems, setFoodItems] = useState([])
  const [search, setSearch] = useState('')
 
//   const loadFoodItems = async () => {
//     try {
//         // let response = await fetch("http://localhost:5000/api/auth/foodData"
//         let response = await fetch("http://localhost:5002/api/fooditems/foodData", {
//             // credentials: 'include',
//             // Origin:"http://localhost:3000/login",
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         if (!response.ok) {
//             throw new Error('Server Error');
//         }
        
//         response = await response.json();
//         // console.log(response[1][0].CategoryName) 

//         setFoodItems(response[0]);
        
//         setFoodCat(response[1]);
//         // console.log(setFoodCat);
//     } catch (error) {
//         console.error('Error:', error.message);
//         // Handle the error as needed, e.g., show an error message to the user
//     }
// }

// useEffect(() => {
//   const fetchData = async () => {
//     await loadFoodItems();
//     console.log("foodItems", await loadFoodItems());
//   };

//   fetchData();
// }, []);

const loadFoodItems = async () => {
  try {
      const response = await fetch("http://localhost:5000/api/fooditems/foodData", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error('Server Error');
      }
      
      const data = await response.json();
      console.log("data", data["data"]);
      console.log("Catdata", data["Catdata"]);
      setFoodItems(data["data"]);
      setFoodCat(data["Catdata"]);
      console.log("foodItems", data[0]);
      
      return data[0];
  } catch (error) {
      console.error('Error:', error.message);
      // Handle the error as needed, e.g., show an error message to the user
      return null;
  }
}

const printfoodCat = () => {
  console.log("foodCat", foodCat);
  // console.log("foodItems", foodItems);
}
useEffect(() => {
  const fetchData = async () => {
      // const result = await loadFoodItems();
      // console.log("foodItems", result);
  };

  fetchData();
}, [foodCat, foodItems]);

useEffect(() => {
  loadFoodItems();
  console.log("foodCat", foodCat);
  // console.log("foodItems", foodItems);
}, []);


  return (
    <div >
      <div>
        <Navbar />
      </div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

          <div className="carousel-inner " id='carousel'>
            <div class=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
              </div>
            </div>
            <div className="carousel-item active" >
              <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'> {/* boootstrap is mobile first */}
      
        {
          
          foodCat
            
          
            ? foodCat.map((data) => {
              return (
                // justify-content-center
                
                <div className='row mb-3'>
                  <div key={data.id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                  {foodItems  ? foodItems.filter(
                    (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filterItems => {
                      return (
                        <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                          {console.log(filterItems.url)}
                          <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} ></Card>
                        </div>
                      )
                    }) : <div> No Such Data </div>}
                </div>
              )
            })
            : ""}
      </div>
      <Footer />
    </div>









  )
}
