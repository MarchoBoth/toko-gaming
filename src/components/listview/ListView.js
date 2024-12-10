import React, { useState } from 'react';
import { formatPrice } from '../../helpers/helpers';
import './listview.css';
import { Link } from 'react-router-dom';

const ListView = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <section className="container mx-auto px-4">
      {currentProducts.map((item) => (
        <article
          key={item.id}
          className="flex flex-col md:flex-row gap-8 pb-10 border-b border-gray-200 mb-8 hover:shadow-xl transition-all duration-300 p-6 rounded-lg group bg-white"
        >
          <div className="relative w-full md:w-[300px] h-[250px] md:h-[200px] overflow-hidden rounded-xl">
            <img
              src={`https://pkdlvjkjcznmtmivzkqc.supabase.co/storage/v1/object/public/images/${item.images[0]}`}
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
              alt={item.name}
              loading="lazy"
            />
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 hover:text-blue-500 transition-colors">
              {item.name}
            </h2>
            <p className="text-blue-500 text-xl font-semibold">
              {formatPrice(item.price)}
            </p>
            <p className="text-gray-400 line-clamp-3 max-w-2xl">
              {item.description}
            </p>
            <Link
              to={`/detail-product/${item.id}`}
              className="bg-blue-500 text-white text-sm font-medium py-2.5 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300 w-fit"
            >
              Details
            </Link>
          </div>
        </article>
      ))}

      <div className="flex justify-center gap-4 mt-8 mb-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md 
                   disabled:opacity-50 disabled:cursor-not-allowed 
                   hover:bg-blue-700 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md 
                   disabled:opacity-50 disabled:cursor-not-allowed 
                   hover:bg-blue-700 transition-colors"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ListView;
