import { differenceInCalendarDays } from "date-fns";
import React from "react";
import "react-day-picker/dist/style.css";
import { toast } from "react-hot-toast";

const BookingModal = ({ selectedProduct, range, refetch }) => {
  const days = differenceInCalendarDays(range?.to, range?.from);

  let rentPrice;
  if (days > selectedProduct?.minimum_rent_period) {
    rentPrice = selectedProduct?.price * days * (1 - 0.1);
  } else {
    rentPrice = selectedProduct?.price * days;
  }

  const saveBookedProductToDB = () => {
    fetch("https://booking-products-server-rohitkhan4141.vercel.app/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("booking completed");
        }
        refetch();
        console.log(data);
      })
      .catch((error) => console.error(error));
  };

  const handleConfirm = () => {
    let milage = null;
    if (selectedProduct?.type === "meter") {
      milage = selectedProduct?.mileage + days * 10;
    }

    const sendData = {
      milage,
    };

    fetch(
      `https://booking-products-server-rohitkhan4141.vercel.app/products/${selectedProduct._id}`,
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
        saveBookedProductToDB();
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <input type='checkbox' id='booking-mod' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box relative'>
          <label
            htmlFor='booking-mod'
            className='btn btn-sm btn-circle absolute right-2 top-2'
          >
            ✕
          </label>
          <h3 className='text-lg font-bold'>Booking Product</h3>
          <div className='flex flex-col'>
            <span>{`Product Name : ${selectedProduct?.name}`}</span>
            <span>{`Rent Period: ${days} days`}</span>
            <span>{`Price: ${rentPrice} `}</span>
            <span>
              {`Min Rent Period:  ${selectedProduct?.minimum_rent_period} days`}{" "}
            </span>
            <span className='mt-5'>
              To confirm a booking, the rent period must be equal to or greater
              than the minimum required period, and if it is grater, a 10%
              discount will be applied to the rent.
            </span>
          </div>
          <div className='modal-action'>
            <label
              disabled={days < selectedProduct?.minimum_rent_period}
              htmlFor='booking-mod'
              className='btn btn-info btn-outline'
              onClick={handleConfirm}
            >
              Confirm
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
