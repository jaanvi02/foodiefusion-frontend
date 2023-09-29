
// import Navbar from '../Navbar'
// import Footer from '../Footer'
// import React, { useEffect, useState } from 'react'

// export default function Myorder() {
//   const [orderData, setorderData] = useState({})

//   const fetchMyOrder = async () => {
//       console.log(localStorage.getItem('userEmail'))
//       await fetch("http://localhost:3000/api/myOrderData", {
//           // credentials: 'include',
//           // Origin:"http://localhost:3000/login",
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body:JSON.stringify({
//               Email:localStorage.getItem('userEmail')
//           })
//       }).then(async (res) => {
//           let response = await res.json()
//           await setorderData(response)
//       })



//       // await res.map((data)=>{
//       //    console.log(data)
//       // })


//   }

//   useEffect(() => {
//       fetchMyOrder()
//   }, [])
//   return (
//     <>
//     <div><Navbar/></div>
//     <div className='container'>
//                 <div className='row'>

//                     {orderData !== {} ? Array(orderData).map(data => {
//                         return (
//                             data.orderData ?
//                                 data.orderData.order_data.slice(0).reverse().map((item) => {
//                                     return (
//                                         item.map((arrayData,index) => {
//                                             return (
//                                                 <div key={index} >
//                                                     {arrayData.Order_date ? <div className='m-auto mt-5'>

//                                                         {data = arrayData.Order_date}
//                                                         <hr />
//                                                     </div> :

//                                                         <div className='col-12 col-md-6 col-lg-3' >
//                                                             <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
//                                                             <img
//                                   src={`https://source.unsplash.com/random/900×700/?${arrayData.name}`}
//                                   className="card-img-top"
//                                   alt={arrayData.name}
//                                   style={{ height: "120px", objectFit: "fill" }}
//                                 />
//                                                                 <div className="card-body">
//                                                                     <h5 className="card-title">{arrayData.name}</h5>
//                                                                     <div className='container w-100 p-0' style={{ height: "38px" }}>
//                                                                         <span className='m-1'>{arrayData.qty}</span>
//                                                                         <span className='m-1'>{arrayData.size}</span>
//                                                                         <span className='m-1'>{data}</span>
//                                                                         <div className=' d-inline ms-2 h-100 w-20 fs-5' >
//                                                                             ₹{arrayData.price}/-
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                             </div>

//                                                         </div>



//                                                     }

//                                                 </div>
//                                             )
//                                         })

//                                     )
//                                 }) : ""
//                         )
//                     }) : ""}
//                 </div>


//             </div>
//     <div><Footer/></div>
//     </>
//   )
// }




import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default function Myorder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/myOrderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: localStorage.getItem('userEmail'),
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const responseData = await response.json();
      setOrderData(responseData.orderData?.order_data || []);
    } catch (error) {
      console.error("Error fetching order data:", error);
      // Handle the error as needed, e.g., show an error message to the user.
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    
        
    <>
         <div><Navbar/></div>
        <div className='container'>
                     <div className='row'>
    
                         {orderData.length > 0 ? orderData.map((data) => {
                            return (
                                data.orderData ?
                                    data.orderData.order_data.slice(0).reverse().map((item) => {
                                        return (
                                            item.map((arrayData,index) => {
                                                return (
                                                    <div key={index} >
                                                        {arrayData.Order_date ? <div className='m-auto mt-5'>
    
                                                            {data = arrayData.Order_date}
                                                            <hr />
                                                        </div> :
    
                                                            <div className='col-12 col-md-6 col-lg-3' >
                                                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <img
                                      src={`https://source.unsplash.com/random/900×700/?${arrayData.name}`}
                                      className="card-img-top"
                                      alt={arrayData.name}
                                      style={{ height: "120px", objectFit: "fill" }}
                                    />
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">{arrayData.name}</h5>
                                                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                            <span className='m-1'>{arrayData.qty}</span>
                                                                            <span className='m-1'>{arrayData.size}</span>
                                                                            <span className='m-1'>{data}</span>
                                                                            <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                                ₹{arrayData.price}/-
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
    
                                                            </div>
    
    
    
                                                        }
    
                                                    </div>
                                                )
                                            })
    
                                        )
                                    }) : ""
                            )
                        }) : ""}
                    </div>
    
    
                </div>
        <div><Footer/></div>
        </>
   
  );
}
