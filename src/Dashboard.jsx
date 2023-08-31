import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTransaction, addTransaction } from "./store/transactionSlice";
import { Link } from "react-router-dom";
import { fetchUSDRate } from "./store/transactionSlice";
import InputForms from "./components/InputForms";
function Dashboard() {
  const transactionData =
    useSelector((state) => Object.values(state.transactions)) || [];

  const dispatch = useDispatch();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const fetchRate = async () => {
      dispatch(fetchUSDRate());
    };
    fetchRate();
  }, []);

  const handleSort = (columnKey) => {
    if (sortConfig.key === columnKey) {
      setSortConfig({
        ...sortConfig,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({ key: columnKey, direction: "asc" });
    }
  };
  if (!transactionData) {
    return <p>Loading...</p>;
  }
  const sortedTransactionData = [...transactionData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">Number of Transactions</h2>

          <p className="text-gray-700">{transactionData.length}</p>
        </div>
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Amount</h2>
          <p className="text-gray-700">
            $
            {transactionData.reduce(
              (total, transaction) => total + transaction.amount,
              0
            )}
          </p>
        </div>
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">
            Third State Transactions
          </h2>
          <p className="text-gray-700">
            {
              transactionData.filter(
                (transaction) => transaction.status === "Third"
              ).length
            }
          </p>
        </div>
      </div>

      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
      >
        Add Transaction
      </button>
      <div className="mt-8">
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-blue-700 text-white">
                <th
                  className="border p-2 cursor-pointer"
                  onClick={() => handleSort("transactionDate")}
                >
                  Transaction Date
                  {/* {renderSortIcon("transactionDate")} */}
                  <span>
                    <span className="ml-1">&#8595;</span>
                    <span className="ml-1">&#8593;</span>
                  </span>
                </th>
                <th
                  className="border p-2 cursor-pointer"
                  onClick={() => handleSort("invoiceNumber")}
                >
                  Invoice Number
                  {/* {renderSortIcon("invoiceNumber")} */}
                  <span>
                    <span className="ml-1">&#8595;</span>
                    <span className="ml-1">&#8593;</span>
                  </span>
                </th>
                <th
                  className="border p-2 cursor-pointer"
                  onClick={() => handleSort("payer")}
                >
                  Payer
                  {/* {renderSortIcon("payer")} */}
                  <span>
                    <span className="ml-1">&#8595;</span>
                    <span className="ml-1">&#8593;</span>
                  </span>
                </th>
                <th
                  className="border p-2 cursor-pointer"
                  onClick={() => handleSort("payee")}
                >
                  Payee
                  {/* {renderSortIcon("payee")} */}
                  <span>
                    <span className="ml-1">&#8595;</span>
                    <span className="ml-1">&#8593;</span>
                  </span>
                </th>
                <th
                  className="border p-2 cursor-pointer"
                  onClick={() => handleSort("amount")}
                >
                  Amount
                  {/* {renderSortIcon("amount")} */}
                  <span>
                    <span className="ml-1">&#8595;</span>
                    <span className="ml-1">&#8593;</span>
                  </span>
                </th>
                <th
                  className="border p-2 cursor-pointer"
                  onClick={() => handleSort("usdEquivalent")}
                >
                  USD Equivalent
                  {/* {renderSortIcon("usdEquivalent")} */}
                  <span>
                    <span className="ml-1">&#8595;</span>
                    <span className="ml-1">&#8593;</span>
                  </span>
                </th>
                <th
                  className="border p-2 cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  Status
                  {/* {renderSortIcon("status")} */}
                  <span>
                    <span className="ml-1">&#8595;</span>
                    <span className="ml-1">&#8593;</span>
                  </span>
                </th>
                <th
                  className="border p-2 cursor-pointer"
                  //   onClick={() => handleSort("payer")}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactionData.map((transaction, index) => (
                <tr key={index} className="border">
                  <td className="border p-2 text-center">
                    {transaction.transactionDate}
                  </td>
                  <td className="border p-2 text-center">
                    <Link
                      to={`/transaction/${transaction.id}`}
                      className="text-blue-700 hover:text-blue-300 px-4 py-2"
                    >
                      {transaction.invoiceNumber}
                    </Link>
                  </td>
                  <td className="border p-2 text-center">
                    {transaction.payer}
                  </td>
                  <td className="border p-2 text-center">
                    {transaction.payee}
                  </td>
                  <td className="border p-2 text-center">
                    ₹{transaction.amount}
                  </td>
                  <td className="border p-2 text-center">
                    ${transaction.usdEquivalent}
                  </td>
                  <td className="p-2 flex justify-between">
                    {transaction.status}{" "}
                    <span>
                      <span
                        className={`border ${
                          transaction.status === "First" ||
                          transaction.status === "Second" ||
                          transaction.status === "Third"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        } w-6 h-2 inline-block`}
                      ></span>
                      <span
                        className={`border ${
                          transaction.status === "Second" ||
                          transaction.status === "Third"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        } w-6 h-2 inline-block`}
                      ></span>
                      <span
                        className={`border ${
                          transaction.status === "Third"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        } w-6 h-2 inline-block`}
                      ></span>
                    </span>
                  </td>
                  <td className="border p-2">
                    <div className="flex justify-center">
                      <select className="w-24 h-8 bg-blue-400 text-white border-2 border-blue-400 focus:outline-none focus:border-blue-700">
                        <option value="">Select</option>
                        <option value="action1">Action 1</option>
                        <option value="action2">Action 2</option>
                        <option value="action3">Action 3</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <InputForms onClose={closeModal} />
      </Modal>
    </div>
  );
}

export default Dashboard;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className=" rounded-lg p-6  w-full">{children}</div>
    </div>
  );
};
