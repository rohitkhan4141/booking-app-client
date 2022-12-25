import React from "react";
import { toast } from "react-hot-toast";

const ReturnModal = ({
  price,
  selectedProduct,
  refetch,
  durability,
  repair,
  days,
}) => {
  const sendData = {
    durability,
  };
  const updateBookedProductToDB = () => {
    fetch(
      `https://booking-products-server-rohitkhan4141.vercel.app/product/${selectedProduct._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("return successfully");
        }
        refetch();
      })
      .catch((error) => console.error(error));
  };
  const handleConfirm = () => {
    fetch(
      `https://booking-products-server-rohitkhan4141.vercel.app/products/${selectedProduct._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        updateBookedProductToDB();
      })
      .catch((error) => console.error(error));
  };
  return (
    <>
      <input type='checkbox' id='return-mod' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box relative'>
          <label
            htmlFor='return-mod'
            className='btn btn-sm btn-circle absolute right-2 top-2'
          >
            ✕
          </label>
          <div className='flex flex-col'>
            <span>{`Product Name : ${selectedProduct?.name}`}</span>
            <span>{`Rent Period: ${days} days`}</span>
            <span>{`Price: ${price} `}</span>
            <span>{`Durability Now : ${durability}`}</span>
          </div>
          <p className='py-4'>{`Price is : ${price}`}</p>
          <label
            htmlFor='return-mod'
            className='btn btn-info btn-outline'
            onClick={handleConfirm}
          >
            Confirm
          </label>
        </div>
      </div>
    </>
  );
};

export default ReturnModal;
