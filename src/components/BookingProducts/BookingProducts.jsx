import { addDays, format } from "date-fns";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import useFetchProducts from "../../CustomHooks/useFetchProducts";
import BookingModal from "../BookingModal/BookingModal";
import Loading from "../Loading/Loading";

const pastMonth = new Date();
const DateRange = {
  from: pastMonth,
  to: addDays(pastMonth, 1),
};

const BookingProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [range, setRange] = useState(DateRange);
  const { products, isLoading, refetch } = useFetchProducts(
    "https://booking-products-server-rohitkhan4141.vercel.app/products"
  );

  if (isLoading) {
    return <Loading />;
  }
  const filteredData = products.filter((d) => d.availability !== false);

  let showDateRange = <p>Please pick the first day.</p>;
  if (range?.from) {
    if (!range.to) {
      showDateRange = <p>{format(range.from, "PPP")}</p>;
    } else if (range.to) {
      showDateRange = (
        <p>
          {format(range.from, "PPP")}–{format(range.to, "PPP")}
        </p>
      );
    }
  }

  const handleChange = (event) => {
    const selectedId = event.target.value;
    const selectedProduct = filteredData.find(
      (product) => product._id === selectedId
    );
    setSelectedProduct(selectedProduct);
  };

  return (
    <div className=' w-10/12 lg:w-1/2 mx-auto p-10'>
      <h3 className='text-3xl text-center mb-4 font-bold'>Booking a Product</h3>
      <select
        onChange={handleChange}
        className='select select-info w-full mt-3'
      >
        {filteredData.map((opt) => (
          <option key={opt._id} value={opt._id}>
            {opt?.name}
          </option>
        ))}
      </select>

      <div>
        <div className='flex flex-col md:flex-row items-center gap-x-4'>
          <DayPicker
            defaultMonth={new Date()}
            mode='range'
            selected={range}
            onSelect={setRange}
          />
          <span className='bg-info text-black p-2 rounded-md '>
            <span className='font-semibold'>Rent Duration:</span>
            <br />
            {showDateRange}
          </span>
        </div>
      </div>
      <div className='flex justify-center items-center md:justify-end md:items-end mx-10 my-5'>
        <button>
          <label htmlFor='booking-mod' className='btn btn-outline btn-info'>
            Confirm Booking
          </label>
        </button>
      </div>
      <BookingModal
        selectedProduct={selectedProduct}
        range={range}
        refetch={refetch}
      />
    </div>
  );
};

export default BookingProducts;
