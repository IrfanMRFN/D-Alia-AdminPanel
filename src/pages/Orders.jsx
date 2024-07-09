import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Orders = ({ API_URL }) => {
  const [orders, setOrders] = useState([]);

  // Mengambil semua data pesanan dari API
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Terjadi kesalahan saat mengambil pesanan");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat mengambil pesanan");
    }
  };

  // Fungsi untuk mengubah status pesanan
  const statusHandler = async (event, orderId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/api/order/status`,
        {
          orderId,
          status: event.target.value,
        },
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Status pesanan berhasil diperbarui");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat memperbarui status pesanan");
    }
  };

  // Fungsi untuk mengubah status pembayaran
  const paymentHandler = async (event, orderId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/api/order/payment`,
        {
          orderId,
          payment: event.target.value,
        },
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Status pembayaran berhasil diperbarui");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat memperbarui status pembayaran");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Memformat angka menjadi mata uang Rupiah
  const formatRupiah = (number) => {
    return number.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  // Fungsi untuk memformat tanggal
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  // Fungsi untuk memformat nomor telepon
  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) {
      return "";
    }
    if (phoneNumber.startsWith("0")) {
      return `+62${phoneNumber.slice(1)}`;
    }
    return phoneNumber;
  };

  // Fungsi untuk membuat pesan pesanan
  const generateOrderMessage = (order) => {
    return order.items
      .map((item) => `${item.name} x ${item.quantity}`)
      .join(", ");
  };

  const getStatusBgColorClass = (status) => {
    switch (status) {
      case "Pesanan sedang diproses":
        return "bg-amber-500";
      case "Pesanan sedang dikirim":
        return "bg-cyan-500";
      case "Pesanan sudah sampai":
        return "bg-green-600";
      default:
        return "bg-gainsboro";
    }
  };

  const getPaymentBgColorClass = (payment) => {
    switch (payment) {
      case "Belum dibayar":
        return "bg-red-600";
      case "Sudah dibayar":
        return "bg-green-600";
      default:
        return "bg-gainsboro";
    }
  };

  return (
    <div className="bg-acadia flex-grow text-offwhite">
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="md:text-2xl text-center mt-2 mb-1 md:mb-2 lg:text-3xl md:mt-6">
          Daftar Pesanan
        </h1>
        <hr className="w-5/6 border-t-1 md:border border-offwhite" />
        {orders
          .slice()
          .reverse()
          .map((order, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center w-11/12 my-4"
            >
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-2 md:gap-3 lg:gap-6 w-full justify-center items-center p-2 md:p-4 border md:border-2 border-acadia-2 rounded-lg shadow-lg bg-acadia-3">
                <p className="border-b text-sm md:text-base border-gainsboro lg:border-0">
                  {formatDate(order.date)}
                </p>
                <div>
                  <ul className="md:text-lg border-b border-gainsboro pb-1 lg:pb-0 lg:border-0">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="md:text-lg font-bold md:mb-1">
                    {order.address.name}
                  </p>
                  <a
                    target="_blank"
                    href={`https://api.whatsapp.com/send?phone=${formatPhoneNumber(
                      order.address.phoneNumber
                    )}&text=Konfirmasi%20pesanan:%0A${encodeURIComponent(
                      generateOrderMessage(order)
                    )},%0A%0AAtas%20nama:%0A${
                      order.address.name
                    }%0A%0AKe%20alamat:%0A${order.address.address}`}
                    className="text-sm md:text-base bg-acadia-2 py-1 px-2 rounded-lg transition duration-200 hover:bg-acadia shadow-lg"
                  >
                    {order.address.phoneNumber}
                  </a>
                </div>
                <p className="text-xs md:text-sm lg:text-base border-b border-gainsboro pb-1 lg:pb-0 lg:border-0">
                  {order.address.address}
                </p>
                <p className="md:text-lg font-bold">
                  {formatRupiah(order.amount)}
                </p>
                <div className="flex justify-center items-center flex-row lg:flex-col gap-2">
                  <select
                    onChange={(event) => statusHandler(event, order._id)}
                    value={order.status}
                    className={`text-sm md:text-base w-1/2 lg:w-full px-2 py-1 text-acadia rounded-lg ${getStatusBgColorClass(
                      order.status
                    )}`}
                  >
                    <option value="Pesanan sedang diproses">
                      Pesanan sedang diproses
                    </option>
                    <option value="Pesanan sedang dikirim">
                      Pesanan sedang dikirim
                    </option>
                    <option value="Pesanan sudah sampai">
                      Pesanan sudah sampai
                    </option>
                  </select>
                  <select
                    onChange={(event) => paymentHandler(event, order._id)}
                    value={order.payment}
                    className={`text-sm md:text-base w-1/2 lg:w-full px-2 py-1 text-acadia rounded-lg ${getPaymentBgColorClass(
                      order.payment
                    )}`}
                  >
                    <option value="Belum dibayar">Belum dibayar</option>
                    <option value="Sudah dibayar">Sudah dibayar</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Orders;
