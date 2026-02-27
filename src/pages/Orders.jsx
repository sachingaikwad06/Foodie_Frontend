import { useEffect, useState } from "react"
import api from "../api/axios";



export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");
      setOrders(response.data.data || response.data)
    } catch (error) {
      setError("Failed to load orders")
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchOrders()
  }, [])

  const payNow = async (orderId) => {
    try {
      await api.post("/payments/initiate", {
        orderId,
        method:"UPI" // changed this code
      });
      //   await api.post("/payments/verify", {
      //   orderId,
      //   success:true 
      // });
      alert("Payment successful");
      fetchOrders();
    } catch (error) {
      alert("payment failed")
    }
  }
  if (loading) return <p className="text-blue-500">Loading Orders...</p>
  if (error) return <p className="text-red-500">{error}</p>
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">My orders</h2>
      {orders.length === 0 && (<p>No orders yet</p>)}
      <div className="space-y-4">
        {
          orders.map((order) => (
            <div key={order._id}>
              <div>
                <p>Order ID:{order._id}</p>
                <p>order Status:{order.status}</p>
                <p>Order payment status:{order.paymentStatus}</p>
              </div>
              <div>
                <p>{order.totalAmount}</p>
                {
                  order.paymentStatus!=="PAID" && (<button onClick={()=>payNow(order._id)}>Pay Now</button>)
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
