import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../api/Axios';

const Restaurants = () => {
  const [restaurant, setRestaurant] = useState([])
  const [loding, setLoding] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.get("/restaurants")
        setRestaurant(response.data.data || response.data)
      } catch (error) {
        setError("Failed to load restaurants");
      } finally {
        setLoding(false)
      }
    }
    fetchRestaurants()
  }, []);

  const handleSelectRestaurant = (restaurantId) => {
    navigate(`/menu/${restaurantId}`)
  }
  if (error) return <p className='text-blue-500'>Loading Restaurants...</p>
  if (error) return <p className='text-red-500'>{error}</p>
  return (
    <div className='max-w-7xl mx-auto '>
      <h2 className='text-center text-3xl my-2 font-bold tracking-wider'>Restaurants</h2>
      <hr className='my-4' />
      <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
        {restaurant.length === 0 && <p>No Restaurants Available</p>}
        <div className='text-center p-1 border rounded-xl'>
          {restaurant.map((resto) => (
            <div key={resto._id} onClick={() => handleSelectRestaurant(resto._id)}>
              <img src={resto.image} alt='' className='w-full h-full rounded-md object-cover' />
              <h2 className='text-xl font-bold p-1'>{resto.name}</h2>
              <p className='p-1'>Location :{resto.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Restaurants