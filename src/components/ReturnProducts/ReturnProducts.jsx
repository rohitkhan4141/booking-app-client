import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useFetchProducts from "../../CustomHooks/useFetchProducts";
import Loading from "../Loading/Loading";
import ReturnModal from "../ReturnModal/ReturnModal";

const ReturnProducts = () => {
  const [repair, setRepair] = useState("");
  const [price, setPrice] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [isCalculate, setIsCalculate] = useState(false);
  const [durability, setDurability] = useState(0);
  const [days, setDays] = useState(0);
  const { products, isLoading, refetch } = useFetchProducts(
    "https://booking-products-server-rohitkhan4141.vercel.app/bookedProducts"
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (isLoading) {
    return <Loading />;
  }

  const onFormSubmit = (data) => {
    let productDetails = products.find((p) => p._id === data.product);
    setSelectedProduct(productDetails);
    setRepair(data.repair);
    let rentPrice;
    if (parseInt(data.period) > productDetails?.minimum_rent_period) {
      rentPrice = productDetails?.price * parseInt(data.period) * (1 - 0.1);
    } else {
      rentPrice = productDetails?.price * parseInt(data.period);
    }
    setPrice(rentPrice);
    if (productDetails?.type === "plain") {
      setDurability(productDetails?.durability - 1 * parseInt(data.period));
    } else {
      setDurability(productDetails?.durability - 2 * parseInt(data.period));
    }
    setDays(data.period);
    setIsCalculate(true);
  };

  return (
    <div className='w-10/12 mx-auto p-10'>
      <h3 className='text-3xl text-center mb-4 font-bold'>Booking a Product</h3>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className='w-full lg:w-1/3 mx-auto'
      >
        <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text'>Select Product</span>
          </label>
          <select
            className='select select-info mb-2'
            {...register("product", { required: true })}
          >
            {products.map((opt) => (
              <option key={opt._id} value={opt._id}>
                {opt?.name}
              </option>
            ))}
          </select>
        </div>
        <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text'>Rentel Period</span>
          </label>
          <input
            {...register("period", { required: true })}
            type='text'
            placeholder='Rental duration?'
            className='input input-bordered w-full input-info'
          />
        </div>
        <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text'>Need to Repair or Not?</span>
          </label>
          <select
            className='select select-info mb-2'
            {...register("repair", { required: true })}
          >
            <option defaultValue='no' value='no'>
              No
            </option>
            <option value='yes'>Yes</option>
          </select>
        </div>

        <input
          type='submit'
          value='Click to Proceed'
          className='btn btn-info btn-outline w-full mt-5'
          htmlFor='return-mod'
        />
        <div className='flex justify-end items-end mt-3'>
          {isCalculate ? (
            <label htmlFor='return-mod' className='btn w-full'>
              Confirm Booking
            </label>
          ) : (
            "Please Click calculate button to confirm"
          )}
        </div>
      </form>
      <ReturnModal
        repair={repair}
        price={price}
        selectedProduct={selectedProduct}
        refetch={refetch}
        durability={durability}
        days={days}
      />
    </div>
  );
};

export default ReturnProducts;
