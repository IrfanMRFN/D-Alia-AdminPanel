import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import ConfirmPopup from "../components/ConfirmPopup";

const List = ({ API_URL }) => {
  const [list, setList] = useState([]);
  const [editFood, setEditFood] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Bakery",
  });
  const [image, setImage] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [foodToRemove, setFoodToRemove] = useState(null);

  const formatRupiah = (number) => {
    return number.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  // Mengambil daftar menu
  const fetchList = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Terjasi kesalahan saat mengambil daftar menu:", error);
      toast.error("Terjasi kesalahan saat mengambil daftar menu:");
    }
  };

  // Menghapus makanan
  const handleRemoveFood = async () => {
    if (foodToRemove) {
      try {
        const response = await axios.delete(
          `${API_URL}/api/food/remove/${foodToRemove}`
        );
        if (response.data.success) {
          toast.success(response.data.message);
          await fetchList();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat menghapus menu:", error);
        toast.error("Terjadi kesalahan saat menghapus menu");
      } finally {
        setShowConfirmPopup(false);
        setFoodToRemove(null);
      }
    }
  };

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Memperbarui menu
  const updateFood = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    if (image instanceof File) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(
        `${API_URL}/api/food/update/${editFood._id}`,
        formData
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setEditFood(null);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat memperbarui menu:", error);
      toast.error("Terjadi kesalahan saat memperbarui menu");
    }
  };

  const handleEditClick = (food) => {
    setEditFood(food);
    setData({
      name: food.name,
      description: food.description,
      price: food.price,
      category: food.category,
    });
    setImage(null);
  };

  const handleCancelClick = () => {
    setEditFood(null);
    setData({
      name: "",
      description: "",
      price: "",
      category: "Bakery",
    });
    setImage(null);
  };

  const confirmRemoveFood = (foodId) => {
    setFoodToRemove(foodId);
    setShowConfirmPopup(true);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="bg-acadia flex-grow text-offwhite">
      <div className="flex flex-col justify-center items-center text-center mb-3">
        <h1 className="md:text-2xl text-center mt-2 mb-1 md:mb-2 lg:text-3xl md:mt-6">
          Daftar Menu
        </h1>
        <hr className="w-5/6 border-t-1 md:border border-offwhite" />
        {list.map((food, index) => (
          <div
            key={index}
            className="flex flex-col items-center w-11/12 md:w-full mt-4"
          >
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 w-full md:w-10/12 gap-1 md:gap-2 lg:gap-4 justify-center items-center text-center border md:border-2 border-acadia-2 rounded-lg shadow-lg bg-acadia-3">
              <div className="lg:mr-8">
                <div className="col-span-1 w-full aspect-w-1 aspect-h-1 flex items-center justify-center">
                  <img
                    src={`${API_URL}/images/${food.image}`}
                    alt="Menu tidak mempunyai gambar"
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
              </div>
              <p className="col-span-1 md:text-xl font-bold text-center">
                {food.name}
              </p>
              <p className="col-span-1 lg:col-span-2 text-xs lg:text-base text-center">
                {food.description}
              </p>
              <p className="col-span-1 font-bold text-sm md:text-lg">
                {formatRupiah(food.price)}
              </p>
              <div className="col-span-1 flex justify-center md:hidden">
                <button
                  onClick={() => handleEditClick(food)}
                  className="w-5/6 px-3 py-1 text-sm md:text-base bg-acadia-2 hover:bg-acadia transition duration-200 m-2 rounded-lg shadow-lg"
                >
                  Edit
                </button>
              </div>
              <div className="flex justify-center items-center md:flex-col">
                <button
                  onClick={() => handleEditClick(food)}
                  className="w-5/6 md:w-3/5 hidden md:block px-3 py-1 text-sm md:text-base bg-acadia-2 hover:bg-acadia transition duration-200 m-2 rounded-lg shadow-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => confirmRemoveFood(food._id)}
                  className="w-5/6 md:w-3/5 px-3 py-1 text-sm md:text-base bg-red-800 hover:bg-red-900 transition duration-200 m-2 rounded-lg shadow-lg"
                >
                  Hapus
                </button>
              </div>
            </div>

            {/* For editing food */}
            {editFood && editFood._id === food._id && (
              <form
                onSubmit={updateFood}
                className="bg-acadia-3 border md:border-2 border-acadia-2 p-1 md:p-4 m-2 md:m-3 w-full md:w-5/6 flex flex-col rounded-lg shadow-lg"
              >
                <div className="flex flex-col lg:flex-row justify-center gap-1 md:gap-2 lg:gap-6">
                  <div className="m-1 md:m-2 flex flex-col justify-center items-center">
                    <p className="text-sm md:text-lg lg:text-xl p-1 md:p-2">
                      Upload Gambar
                    </p>
                    <label htmlFor="image">
                      {image ? (
                        <img
                          src={
                            image instanceof File
                              ? URL.createObjectURL(image)
                              : `${API_URL}/images/${image}`
                          }
                          alt=""
                          className="w-auto h-24 md:h-48 cursor-pointer shadow-lg"
                        />
                      ) : (
                        <div className="flex flex-col justify-center items-center w-40 h-24 md:w-56 md:h-36 lg:w-64 lg:h-48 cursor-pointer shadow-lg border md:border-2 border-offwhite bg-gainsboro rounded-lg">
                          <img
                            src={assets.upload_icon}
                            alt=""
                            className="h-6 w-6 md:h-12 md:w-12 m-2"
                          />
                          <p className="font-bold text-acadia-2 md:text-xl lg:text-2xl">
                            Upload
                          </p>
                        </div>
                      )}
                    </label>
                    <input
                      onChange={(e) => setImage(e.target.files[0])}
                      type="file"
                      id="image"
                      hidden
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center lg:items-start lg:justify-center">
                    <div>
                      <p className="text-sm md:text-lg lg:text-xl p-1 md:p-2 text-center md:text-left">
                        Nama
                      </p>
                      <input
                        onChange={handleInputChange}
                        value={data.name}
                        type="text"
                        name="name"
                        placeholder="Masukkan nama menu"
                        className="mb-1 md:mb-2 px-2 md:px-4 py-1 w-56 sm:w-72 text-sm md:text-base rounded-lg text-acadia bg-offwhite shadow-lg"
                        required
                      />
                    </div>
                    <div>
                      <p className="text-sm md:text-lg lg:text-xl p-1 md:p-2 text-center md:text-left">
                        Deskripsi
                      </p>
                      <textarea
                        onChange={handleInputChange}
                        value={data.description}
                        name="description"
                        rows="6"
                        placeholder="Masukkan deskripsi menu"
                        className="mb-1 md:mb-2 px-2 md:px-4 py-1 w-60 sm:w-80 md:w-96 text-sm md:text-base rounded-lg text-acadia bg-offwhite shadow-lg"
                        required
                      ></textarea>
                    </div>
                    <div className="flex flex-col md:flex-row md:gap-2">
                      <div>
                        <p className="text-sm md:text-lg lg:text-xl p-1 md:p-2 text-center md:text-left">
                          Kategori
                        </p>
                        <select
                          onChange={handleInputChange}
                          value={data.category}
                          name="category"
                          className="mb-1 md:mb-2 px-2 md:px-4 py-1 w-52 sm:w-60 text-sm md:text-base rounded-lg text-acadia bg-offwhite shadow-lg"
                        >
                          <option value="Bakery">Bakery</option>
                          <option value="Cakes">Cakes</option>
                          <option value="Cookies">Cookies</option>
                          <option value="Snacks">Snacks</option>
                        </select>
                      </div>
                      <div>
                        <p className="text-sm md:text-lg lg:text-xl p-1 md:p-2 text-center md:text-left">
                          Harga
                        </p>
                        <input
                          onChange={handleInputChange}
                          value={data.price}
                          type="number"
                          name="price"
                          placeholder="Rp 50.000"
                          className="mb-1 md:mb-2 px-2 md:px-4 py-1 w-52 sm:w-60 text-sm md:text-base rounded-lg text-acadia bg-offwhite shadow-lg"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-2 md:gap-4 m-1 md:m-3">
                  <button
                    type="submit"
                    className="w-28 sm:w-36 md:w-56 py-1 md:py-2 my-1 md:my-2 text-sm md:text-base bg-finch rounded-lg shadow-lg transition duration-200 hover:bg-kelp"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    className="w-28 sm:w-36 md:w-56 py-1 md:py-2 my-1 md:my-2 text-sm md:text-base bg-acadia-2 rounded-lg shadow-lg transition duration-200 hover:bg-acadia"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        ))}
      </div>

      {showConfirmPopup && (
        <ConfirmPopup
          title="Confirm Delete"
          message="Apakah anda yakin ingin menghapus menu ini?"
          onConfirm={handleRemoveFood}
          onCancel={() => setShowConfirmPopup(false)}
        />
      )}
    </div>
  );
};

export default List;
