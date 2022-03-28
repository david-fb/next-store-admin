import endPoints from '@services/api';
import useFetch from '@hooks/useFetch';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useState, useEffect } from 'react';
import { Chart } from '@common/Chart';

const PRODUCT_LIMIT = 5;

export default function Dashboard() {
  const [productOffset, setProductOffset] = useState(0);
  let [currentPage, setCurrentPage] = useState(0);
  const products = useFetch(endPoints.products.getProducts(PRODUCT_LIMIT, productOffset));
  const totalItems = products?.count;
  const pages = [];
  if (PRODUCT_LIMIT > 0) {
    for (let i = 0; i < totalItems; i += PRODUCT_LIMIT) {
      pages.push(i);
    }
  }

  //--Pagination--
  function handleNextPage() {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  }

  function handlePreviousPage() {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  }

  function handlePageClick(index) {
    setCurrentPage(index);
  }

  useEffect(() => {
    if (pages.length > 0) {
      setProductOffset(pages[currentPage]);
    }
  }, [currentPage]);

  //Pagination buttons
  {
    /* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */
  }
  const paginationButtons = [];
  //Comprueba si se puede hacer los 5 botones
  if (pages.length > 5) {
    //Genera 3 botones desde la posicion currentPage
    for (let i = currentPage; i <= currentPage + 3; i++) {
      //Comprueba si se puede seguir haciendo botones si no termina el ciclo
      if (i > pages.length - 1) {
        break;
      }
      //Si la posicion es mayor a 2 muestra el boton inicial y los tres puntos
      if (currentPage > 1 && i === currentPage) {
        paginationButtons.push(
          <button
            onClick={() => handlePageClick(0)}
            key={`Button-page-${1}`}
            className={`${
              0 === currentPage ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
            } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
          >
            {1}
          </button>
        );
        paginationButtons.push(
          <span key={`Button-page-dots-left`} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
            ...
          </span>
        );
      }
      //Si currentPage es mayor al largo de las paginas - 3 genera los ultimos botones con otro ciclo y escapa del principal
      if (currentPage >= pages.length - 3) {
        for (let j = pages.length - 3; j < pages.length; j++) {
          paginationButtons.push(
            <button
              onClick={() => handlePageClick(j)}
              key={`Button-page-${j}`}
              className={`${
                j === currentPage ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
              } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
            >
              {j + 1}
            </button>
          );
        }
        break;
      }
      //Si la posicion es menor a al final menos muestra el boton inicial y los tres puntos
      if (currentPage < pages.length - 3 && i === currentPage + 3 && i + 1 <= pages.length - 1) {
        paginationButtons.push(
          <span key={`Button-page-dots-right`} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
            ...
          </span>
        );
        paginationButtons.push(
          <button
            onClick={() => handlePageClick(pages.length - 1)}
            key={`Button-page-${pages.length - 1}`}
            className={`${
              pages.length - 1 === currentPage ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
            } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
          >
            {pages.length}
          </button>
        );
      }
      //Genera los botones restantes
      else {
        paginationButtons.push(
          <button
            onClick={() => handlePageClick(i)}
            key={`Button-page-${i}`}
            className={`${
              i === currentPage ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
            } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
          >
            {i + 1}
          </button>
        );
      }
    }
  }
  //si las paginas son menores a 5
  else {
    for (let i = 0; i < pages.length; i++) {
      paginationButtons.push(
        <button
          onClick={() => handlePageClick(i)}
          key={`Button-page-${i}`}
          className={`${
            i === currentPage ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
          } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
        >
          {i + 1}
        </button>
      );
    }
  }
  //--Pagination end--

  //Chart
  const categoryNames = products?.rows?.map((product) => product.category);
  const categoryCount = categoryNames?.map((category) => category.name);

  const countOccurences = (array) => array?.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});

  const data = {
    datasets: [
      {
        label: 'Categories',
        data: countOccurences(categoryCount),
        borderWidth: 2,
        backgroundColor: ['#ffbb11', '#c0c0c0', '#50AF95', '#f3ba2f', '#2a71d0'],
      },
    ],
  };

  return (
    <>
      <Chart className="mb-8 mt-2" chartData={data} />
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Id
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products?.rows?.map((product) => (
                    <tr key={`Product-item-${product.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={product?.image} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product?.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product?.category?.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">${product?.price}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product?.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="edit" className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="edit" className="text-indigo-600 hover:text-indigo-900">
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Pagination */}
        {pages.length > 0 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={handlePreviousPage}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{productOffset + 1}</span> to <span className="font-medium">{`${productOffset + products.rows?.length}`}</span> of{' '}
                  <span className="font-medium">{totalItems}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={handlePreviousPage}
                    href="/"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {paginationButtons}
                  <button
                    onClick={handleNextPage}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
