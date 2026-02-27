import { useEffect, useState } from "react";
import api from "../api/Axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders/admin");
      setOrders(response.data.data || response.data)
    } catch (error) {
      setError("Failed to load admin orders")
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchOrders()
  }, [])

  const updateStatus = async (orderId, status) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status });
      fetchOrders();
    } catch (error) {
      alert("failed to update status");
    }
  }
  if (loading) return <p className="text-blue-500">Loading Admin Orders...</p>
  if (error) return <p className="text-red-500">{error}</p>
  return (
    <div className="max-w-5xl mx-auto">
      <h2>AdminOrders</h2>
      {orders.length === 0 && (<p>No orders yet</p>)}
      <div className="space-y-4">
        {
          orders.map((order) => (
            <div key={order._id}>
              <div>
                <p>Order ID:{order._id}</p>
                <p>order Status:{order.status}</p>
                <p>Order payment status:{order.paymentStatus}</p>
                <p>Amount:{order.totalAmount}</p>
              </div>
              <div>
                {
                  order.status === "PLACED" && (
                    <button onClick={() => updateStatus(order._id, "ACCEPTED")}>Preparing</button>
                  )
                }
                {
                  order.status==="ACCEPTED" && 
                  ( <button onClick={() => updateStatus(order._id, "PREPARING")}>Dispatch</button>)
                }

               
               {
                order.status==="PREPARING" && 
                ( <button onClick={() => updateStatus(order._id, "DELIVERED")}>Delivered</button>)
               }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}