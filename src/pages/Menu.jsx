import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';



export default function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const [cart, setCart] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { restaurantId } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await api.get(`/menuItems/restaurant/${restaurantId}`);
                setMenuItems(response.data.data || response.data)
            } catch (error) {
                setError("failed to load menu items")
            } finally {
                setLoading(false)
            }
        }
        fetchMenuItems()
    }, [restaurantId])

    const updateQuantity = (menuItemId, update) => {
        setCart((prevCart) => {
            const currentQty = prevCart[menuItemId] || 0;
            const newQty = currentQty + update;

            if (newQty <= 0) {
                const updated = { ...prevCart };
                delete updated[menuItemId];
                return updated
            }
            return {
                ...prevCart,
                [menuItemId]: newQty
            }
        })
    }
    const placeOrder = async () => {
        try {
            const items = Object.keys(cart).map((menuItemId) => ({
                menuItemId,
                quantity: cart[menuItemId],
            }))
            await api.post("/orders", {
                restaurantId,
                items
            })
            navigate("/orders")
        } catch (error) {
            alert("failed to place order")
        }
    }
    if (loading) return <p className="text-blue-500">Loading Menu...</p>
    if (error) return <p className="text-red-500">{error}</p>
    return (
        <div className='max-w-7xl mx-auto'>
            <h2 className='text-center font-bold text-3xl my-3'>Menus</h2>
            {menuItems.length === 0 && (
                <p>No Menu Items available </p>
            )}
            <div className='grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                {menuItems.map((item) => (
                    <div key={item._id} className='border p-2 rounded-md shadow-xl shadow-blue-800'>
                        <div>
                            <h3 className='font-bold text-xl'>{item.name}</h3>
                            <p className='font-semibold'>&#8377; {item.price}</p>
                        </div>
                        <div className='space-x-4 p-2'>
                            <button className='border px-5 text-xl rounded-sm'
                             onClick={() => updateQuantity(item._id, -1)}>-</button>
                            <span>{cart[item._id] || 0}</span>
                            <button className='border px-5 text-xl rounded-sm' 
                            onClick={() => updateQuantity(item._id, 1)}>+</button>
                        </div>
                    </div>
                ))}
            </div>
            <button className='border p-2 rounded-md mt-3 bg-blue-950 text-white' onClick={placeOrder}>Place Order</button>
        </div>
    )
}