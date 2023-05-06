import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { auth, db } from '../firebase.config'
import { onAuthStateChanged } from 'firebase/auth'
import Spinner from '../components/Spinner'
// import Razorpay from 'razorpay'
// import { loadScript, Razorpay } from 'razorpay';
const OrderConfirmation = () => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const location = useLocation();
    const product = location.state.product
    const request = location.state.rental
    const order = location.state.order
    const [payment, setPayment] = useState(null);

    // useEffect(() => {
    //     const script = loadScript('https://checkout.razorpay.com/v1/checkout.js');
    //     script.onload = () => {
    //         const options = {
    //             key: 'SHOjQ40ZGFaRqtpZTIT21DtN',
    //             amount: product.price * 100,
    //             currency: 'INR',
    //             name: 'Your Company Name',
    //             description: 'Product description',
    //             image: 'https://your-company-logo-url.png',
    //             order_id: 'YOUR_ORDER_ID',
    //             handler: function (response) {
    //                 console.log(response);
    //                 // handle successful payment
    //             },
    //             prefill: {
    //                 name: user.displayName,
    //                 email: user.email,
    //                 contact: '+919876543210'
    //             }
    //         };
    //         const rzp = new Razorpay(options);
    //         setPayment(rzp);
    //     };
    // }, []);

    // const handlePayment = () => {
    //     payment.open();
    // };

    useEffect(() => {
        setLoading(true)
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false)
        });

        return () => {
            unsubscribe();
        };
    }, [])


    // const order = location.state.order
    // const product = location.state.product
    // useEffect(() => {
    //     const fetchData = async () => {

    //     const ordersRef = collection(db, 'orders')



    //       const ordersQuery = query(
    //         ordersRef,
    //         where('userRef', '==', auth.currentUser.uid)
    //       )


    //       const orders = ordersQuery.docs.map(doc => ({
    //         id: doc.id,
    //         data: doc.data()
    //       }))

    //       SetOrderDetails(orders)
    //       setLoading(false)
    //     }

    //     setLoading(true)
    //     fetchData()

    //   }, [user])

    const handlePayment = () =>{
        console.log('hello')
    }

    const Reqid = order.id
    const str = JSON.stringify(Reqid)
    const uniqueOrderId = str.slice(-5, -1);
    const options = { dateStyle: 'long' };

    const date = new Date(order.data.timestamp?.seconds * 1000).toLocaleString('en-US', options);
    const startDate = new Date(request.startDate?.seconds * 1000).toLocaleString('en-US', options);
    const endDate = new Date(request.endDate?.seconds * 1000).toLocaleString('en-US', options);
    if (!user) {
        return (
            <div>
                <Spinner />
            </div>
        )
    }

    return (
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col ">
                <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800 uppercase">Order #{uniqueOrderId}</h1>
                <p className="text-base font-medium leading-6 text-gray-600">{date}</p>
            </div>
            <div className='mt-3'>
                <h1 className='text-red-500'> Please confirm order by clicking on this link</h1>
                <button className='' onClick={handlePayment}>Make payment</button>
            </div>

            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                        <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Your order</p>
                        <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                            <div className="pb-4 md:pb-8 w-full md:w-40">
                                <img className="w-full hidden md:block" src={product && product.imgUrls[0]} alt="dress" />
                                <img className="w-full md:hidden" src={product && product.imgUrls[0]} alt="dress" />
                            </div>
                            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">{product.title}</h3>
                                    <div className="flex justify-start items-start flex-col space-y-2">
                                        <p className="text-sm leading-none text-gray-800">
                                            <span className="text-gray-300">Rental start: </span> {startDate}
                                        </p>
                                        <p className="text-sm leading-none text-gray-800">
                                            <span className="text-gray-300">Rental End: </span> {endDate}
                                        </p>

                                    </div>
                                </div>
                                <div className="flex justify-between space-x-8 items-start w-full">
                                    <p >Payment <span className='text-yellow-500'>Pending</span></p>
                                    <p className="text-base xl:text-lg leading-6">
                                        Rs {(product.regularPrice) * (request.rentalPeriod)} <span className="text-red-300 line-through"> $45.00</span>
                                    </p>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                            <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>
                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div className="flex justify-between  w-full">
                                    <p className="text-base leading-4 text-gray-800">Subtotal</p>
                                    <p className="text-base leading-4 text-gray-600">Rs {(product.regularPrice) * (request.rentalPeriod)}</p>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    {/* <p className="text-base leading-4 text-gray-800">
                                        Discount <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">STUDENT</span>
                                    </p> */}
                                    <p className="text-base leading-4 text-gray-600">-$28.00 (50%)</p>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base leading-4 text-gray-800">Security deposit</p>
                                    <p className="text-base leading-4 text-gray-600">{((product.regularPrice) * (request.rentalPeriod)) / 2}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                                <p className="text-base font-semibold leading-4 text-gray-600">{((product.regularPrice) * (request.rentalPeriod)) / 2 + ((product.regularPrice) * (request.rentalPeriod))}</p>
                            </div>
                        </div>
                        {/* <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                            <h3 className="text-xl font-semibold leading-5 text-gray-800">Shipping</h3>
                            <div className="flex justify-between items-start w-full">
                                <div className="flex justify-center items-center space-x-4">
                                    <div class="w-8 h-8">
                                        <img class="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                                    </div>
                                    <div className="flex flex-col justify-start items-center">
                                        <p className="text-lg leading-6 font-semibold text-gray-800">
                                            DPD Delivery
                                            <br />
                                            <span className="font-normal">Delivery with 24 Hours</span>
                                        </p>
                                    </div>
                                </div>
                                <p className="text-lg font-semibold leading-6 text-gray-800">Rs 300</p>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <button className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">View Carrier Details</button>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
                    <h3 className="text-xl font-semibold leading-5 text-gray-800">Customer</h3>
                    <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                        <div className="flex flex-col justify-start items-start flex-shrink-0">
                            <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                <img src={user.photoURL} alt="avatar" />
                                <div className=" flex justify-start items-start flex-col space-y-2">
                                    <p className="text-base font-semibold leading-4 text-left text-gray-800">{user.displayName}</p>

                                </div>
                            </div>

                            <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 7L12 13L21 7" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className="cursor-pointer text-sm leading-5 text-gray-800">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                            <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Shipping address</p>
                                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{order.address1}</p>
                                </div>
                                <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
                                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{order.address1}</p>
                                </div>
                            </div>
                            <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                                <button className="mt-6 md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800">Edit Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderConfirmation
