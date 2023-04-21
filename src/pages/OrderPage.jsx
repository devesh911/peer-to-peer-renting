import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import Spinner from '../components/Spinner'

function OrderPage() {
  // eslint-disable-next-line
  const params = useParams()
  const [agree, setAgree] = useState(false);

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({

    name:'',
    phone:'',
    address1: '',
    address2: '',
    addressInstruction :'',
    pincode:''
  
  })

  const {
    name,
    phone,
    address1,
    address2,
    addressInstruction,
    pincode
  } = formData

  const auth = getAuth()
  const navigate = useNavigate()
  const isMounted = useRef(true)

  const checkboxHandler = () => {
    
    setAgree(!agree);
  }

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid })
        } else {
          navigate('/sign-in')
        }
      })
    }

    return () => {
      isMounted.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted])

  const onSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    const formDataCopy = {
      ...formData,
      requestId: params.requestId,
      timestamp: serverTimestamp(),
    }

    

    const docRef = await addDoc(collection(db, "orders"), formDataCopy);
    setLoading(false);
    toast.success("Listing saved");
    navigate(`/orderDetails/${docRef.id}`);
  }

  const onMutate = (e) => {
   

    // Text/Booleans/Numbers

      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }))
    

  }

  if (loading) {
    return <Spinner />
  }

  console.log(formData)
  return (
    <div className=''>
      
     


      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 ' >
        
      <div className='mx-2 my-3 md:m-6'>
        <header>
        <p className='m-3 text-2xl font-semibold'>Contact information</p>
      </header>
      <form className=" " onSubmit={onSubmit}>
     
          <label className='block m-3'>Name:</label>
          <input
            className='mx-3 p-2 rounded'
            placeholder='Full name'
            type='text'
            id='name'
            value={name}
            onChange={onMutate}
            
            required
          />
          <label className='block m-3'>Phone:</label>
          <input
            className='mx-3 p-2 rounded'
            placeholder='+9196xxxxx908'
            type='text'
            id='phone'
            value={name}
            onChange={onMutate}
          />
         
         
        
          <label className='block m-3'>Address line 1:</label>
          <input
            className='mx-3 p-2 rounded w-full md:w-[60%]'
            type='text' 
            id='address1'
            placeholder='street, building and house no.'
            value={address1}
            onChange={onMutate}
            
            minLength='10'
            required
          />

          
          <label className='block m-3'>Address line 2: </label>
          <input
            className='mx-3  w-full md:w-[60%] rounded p-2'            
            type='text'
            id='address2'
            value={address2}
            placeholder = "landmark and city"
            onChange={onMutate}
            minLength='10'
            required
          />
       
          <label className='block m-3'> How to reach : </label>
          <textarea
            className='mx-3  w-full md:w-[60%] rounded p-2'            
            type='text'
            id='address2'
            value={addressInstruction}
            placeholder = "Address instruction"
            onChange={onMutate}
            minLength='10'
            required
          />
          <label className='block m-3'>Pincode:</label>
          <input 
          className='mx-3 p-2 rounded'
          type="text" 
          id='pincode'
          value={pincode}
          pattern="[0-9]{6}" 
          maxlength="6"
          onChange={onMutate}
          />


          
        <div className='m-3 '>
          <input type="checkbox" id="agree" onChange={checkboxHandler} />
          <label htmlFor="agree"> I agree to <b>terms and conditions</b></label>
        </div>

          <button disabled={!agree} type='submit' className='bg-blue-500 rounded p-3 mx-3'>
            Create Listing
          </button>
        </form>
        </div>
        <div>
          this is order detail part
        </div>
        
      </div>
    </div>
  )
}

export default OrderPage