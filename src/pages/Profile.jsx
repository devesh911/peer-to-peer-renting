import { useState, useEffect, useCallback,lazy, Suspense, } from 'react'
import { Link, NavLink, Outlet, Route, Routes } from 'react-router-dom'
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth'
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Listingitem from '../components/Listingitem'
import arrowRight from '../../public/assets/svg/keyboardArrowRightIcon.svg'
import Orders from '../components/Orders'
import ProfileLayout from '../components/Layout/ProfileLayout/ProfileLayout'
import ErrorBoundary from '../components/ErrorBoundries/ErrorBoundry'
import Spinner from '../components/Spinner'
import RequestedRental from './RequestedRental'




function Profile() {
  // const RequestedRental = lazy(() => import('./RequestedRental'));  
  // const RentalRequests = lazy(() => import('./RentalRequests'));
  const auth = getAuth()
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)
  const [orders, setOrders] = useState(null)
  const [user, setUser] = useState(null)
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })



  const { name, email } = formData

  const navigate = useNavigate()

console.log(listings)

  useEffect(() => {
    const fetchData = async () => {
      const listingsRef = collection(db, 'listings')
      const ordersRef = collection(db, 'orders')

      const listingsQuery = query(
        listingsRef,
        where('userRef', '==', auth.currentUser.uid)
      )

      const ordersQuery = query(
        ordersRef,
        where('userRef', '==', auth.currentUser.uid)
      )

      const [listingsQuerySnap, ordersQuerySnap] = await Promise.all([
        getDocs(listingsQuery),
        getDocs(ordersQuery)
      ])


      const listing = listingsQuerySnap.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))

      const orders = ordersQuerySnap.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))

      setListings(listing)
      setOrders(orders)
      setLoading(false)
    }

    setLoading(true)
    fetchData()

  }, [user])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user)
    });

    return () => {
      unsubscribe();
    };
  })

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }



  const onList = (e) => {

  }

  const onDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      )
      setListings(updatedListings)
      navigate(`/profile`)
      toast.success('Successfully deleted listing')
    }
  }


  const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)

  const isNotActiveStyle = 'text-[16px] md:text-[24px] my-3 font-semibold  px-3 flex items-center px-5 gap-3 text-gray-500   capitalize border ';
  const isActiveStyle = 'text-[16px] md:text-[24px] my-3 font-semibold  px-3 flex items-center px-7 gap-3 font-extrabold border-r-2  transition-all duration-200 ease-in-out capitalize';
  const [activeSection, setActiveSection] = useState('listings'); // Default to 'listings'

  return (
    <>
      {/* <ProfileHeader/> */}
      

      <ProfileLayout>
        <Outlet/>
      </ProfileLayout>
    
      {/* <main className='h-full flex-col '>




        <div className='border-t-2 border-gray-500 flex justify-center  mx-auto w-3/4   overflow-scroll'>

          <button
            className={activeSection === 'listings' ? `${isActiveStyle}` : `${isNotActiveStyle}`}
            onClick={() => setActiveSection('listings')}
          >
            Your Listings
          </button>


          <button
            className={activeSection === 'orders' ? `${isActiveStyle}` : `${isNotActiveStyle}`}
            onClick={() => setActiveSection('orders')}
          >
            Your Orders
          </button>


        </div>

        <div className='mt-3 '>
          {activeSection === 'listings' && (
            <div className=''>

              {!loading && listings?.length > 0 ? (
                <>
                  <div className='grid sm:grid-cols-2 place-items-center md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-2 md:p-3 md:px-16 px-3'>
                    {listings?.map((listing) => (
                      <Listingitem
                        keyId={listing.id}
                        listing={listing.data}
                        id={listing.id}
                        onDelete={() => onDelete(listing.id)}
                        onEdit={() => onEdit(listing.id)}
                        onList={() => onList(listing.id)}
                      />
                    ))}
                  </div>

                </>
              ) : (<p className='my-3   px-3'>no listings</p>)}
            </div>
          )}

          {activeSection === 'orders' && (
            <div> {
              !loading && orders?.length > 0 ? (

                <div className='mx-auto'>
                  {orders?.map((order) => (
                    <Orders
                      orderArr={order}
                    />
                  ))
                  }
                </div>
              ) :
                (
                  <p className='my-3  px-3'>No orders</p>
                )
            }</div>

          )}




        </div>

      </main> */}

    </>

  )
}

export default Profile