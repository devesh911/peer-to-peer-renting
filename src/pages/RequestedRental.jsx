import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where,doc, updateDoc, orderBy } from 'firebase/firestore'

import { toast } from 'react-toastify'
import RentalRequestCard from '../components/RentalRequestCard'
import Spinner from '../components/Spinner'
import { db } from '../firebase.config'

const RequestedRental = () => {
  const auth = getAuth();

  const [rentalRequests, setRentalRequests] = useState(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null);

  
  const fetchRequests = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    const rentalRequestsRef = collection(db, 'rentalRequest')
                      
    const q = query(
      rentalRequestsRef,
      where('userId', '==', auth.currentUser.uid),
      orderBy('timestamp', 'desc')

    );

    try {
      const querySnapshot = await getDocs(q);
      let rentals = [];
      console.log(querySnapshot);
      querySnapshot.forEach((doc)=>{
         rentals.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setRentalRequests(rentals);
    } catch (error) {
      console.error('Error fetching rental requests:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    

    fetchRequests()
  }, [fetchRequests]);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  
  return (
    <div className=''>
      <p className='font-semibold container mx-auto text-center uppercase text-[30px] md:text-[50px] px-3 m-1 text-blue-600'>Your requests</p>
      <p className='font-medium text-center bg-white rounded-full text-[15px] md:text-[25px] px-3 mx-3 text-blue-600 '>You can see the items you have requested for renting</p>
      {loading ? (<Spinner/>) : 
      
      rentalRequests && rentalRequests.length > 0 ? (

        rentalRequests.map((request) => (
          <div className=' md:m-3 mt-3 ' key={request.id}>
            <RentalRequestCard
              request = {request}
              
              rentals = {request.data}
            />
            
          </div>
        ))
      ) : (<p>No requests</p>)
      }

      
    </div>
  )
}

export default RequestedRental