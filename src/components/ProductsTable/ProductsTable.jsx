import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFetchProducts from "../../CustomHooks/useFetchProducts";
import Loading from "../Loading/Loading";

const ProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const { products, isLoading } = useFetchProducts(
    "https://booking-products-server-rohitkhan4141.vercel.app/products"
  );

  if (isLoading) {
    return <Loading />;
  }

  // Filter the data based on the search term
  const filteredData = products.filter((item) =>
    Object.values(item).some(
      (val) =>
        typeof val === "string" &&
        val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort the data based on the selected column and direction
  const sortedData = filteredData.sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  });

  return (
    <div className='w-full lg:w-10/12 mx-auto'>
      <h1 className='text-4xl text-center mt-7 mb-10 font-bold'>Products</h1>
      <div className='w-1/2 mx-auto flex flex-col lg:flex-row gap-x-10 gap-y-5 mb-8 items-center'>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search...'
          className='input input-bordered input-info w-full lg:max-w-lg'
        />
        <div className='flex '>
          <select
            id='sort-column'
            value={sortColumn}
            onChange={(e) => setSortColumn(e.target.value)}
            className='select select-info w-full max-w-lg'
          >
            <option value='name'>Sort by Type</option>
            <option value='name'>Plain</option>
            <option value='age'>Meter</option>
          </select>
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent Fees</th>
              <th>Availability</th>
              <th>Mileage</th>
              <th>Durability</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((product, index) => (
              <tr className='hover' key={index}>
                <th>{index + 1}</th>
                <td>{product?.name}</td>
                <td>{product?.type}</td>
                <td>{product?.price}</td>
                <td>{product?.availability ? "yes" : "no"}</td>
                <td>
                  {product?.mileage ? product?.mileage : "no mileage yet"}
                </td>
                <td>{product?.durability}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex justify-end items-end mx-10 mt-7 mb-14'>
          <Link className='btn btn-outline btn-info mx-3' to='/bookings'>
            Bookings
          </Link>
          <Link className='btn btn-outline btn-info' to='/return-products'>
            Return
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
