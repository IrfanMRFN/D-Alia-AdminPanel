import React, { useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const Add = ({ API_URL }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Bakery",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    try {
      const response = await axios.post(`${API_URL}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Bakery",
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menambahkan item");
    }
  };

  return (
    <div className="bg-acadia text-offwhite flex-grow">
      <div className="flex flex-col justify-center items-center">
        <h1 className="md:text-2xl text-center mt-2 mb-1 md:mb-2 lg:text-3xl md:mt-6">
          Tambah Menu
        </h1>
        <hr className="w-5/6 border-t-1 md:border border-offwhite" />
      </div>
      <form
        onSubmit={onSubmitHandler}
        className="md:mx-8 my-1 md:my-4 flex flex-col"
      >
        <div className="flex flex-col md:flex-row justify-center gap-1 md:gap-8 lg:gap-16">
          <div className="m-1 md:m-2 flex flex-col justify-center items-center">
            <p className="text-sm md:text-lg lg:text-xl p-1 md:p-2">
              Upload Gambar
            </p>
            <label htmlFor="image">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
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
              required
            />
          </div>
          <div className="flex flex-col justify-center items-center md:items-start md:justify-center">
            <div>
              <p className="text-sm md:text-lg lg:text-xl p-1 md:p-2 text-center md:text-left">
                Nama
              </p>
              <input
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                name="name"
                placeholder="Masukkan nama menu baru"
                className="mb-1 md:mb-2 px-2 md:px-4 py-1 w-60 sm:w-72 text-sm md:text-base rounded-lg text-acadia bg-offwhite shadow-lg"
                required
              />
            </div>
            <div>
              <p className="text-sm md:text-lg lg:text-xl p-1 md:p-2 text-center md:text-left">
                Deskripsi
              </p>
              <textarea
                onChange={onChangeHandler}
                value={data.description}
                name="description"
                rows="5"
                placeholder="Masukkan deskripsi menu"
                className="mb-1 md:mb-2 px-2 md:px-4 py-1 w-64 sm:w-80 md:w-96 text-sm md:text-base rounded-lg text-acadia bg-offwhite shadow-lg"
                required
              ></textarea>
            </div>
            <div>
              <div>
                <p className="text-sm md:text-lg lg:text-xl p-1 md:p-2 text-center md:text-left">
                  Kategori
                </p>
                <select
                  onChange={onChangeHandler}
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
                  onChange={onChangeHandler}
                  value={data.price}
                  type="Number"
                  name="price"
                  placeholder="Rp 50.000"
                  className="mb-1 md:mb-2 px-2 md:px-4 py-1 w-52 sm:w-60 text-sm md:text-base rounded-lg text-acadia bg-offwhite shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center m-1 md:m-3">
          <button
            type="submit"
            className="w-28 sm:w-36 md:w-56 py-1 md:py-2 my-1 md:my-2 text-sm md:text-base bg-finch rounded-lg shadow-lg transition duration-200 hover:bg-kelp"
          >
            Tambah
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
