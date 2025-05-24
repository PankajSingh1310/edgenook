import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import userContext from '@/context/user.context';

const Enroll = () => {
  const { id } = useParams();
  const { isLoggedIn } = useContext(userContext);

  return (
    <div className="max-w-xl mx-auto py-12 px-6 bg-gray-50 dark:bg-zinc-900 rounded-xl shadow-md">
      <h1 className="text-4xl font-bold mb-8 text-center text-zinc-800 dark:text-white">Enroll in Course</h1>

      {isLoggedIn ? (
        <>
          <p className="mb-6 text-gray-700 dark:text-zinc-300 text-center">
            You're enrolling in course ID: <strong className="text-blue-600 dark:text-blue-400">{id}</strong>
          </p>

          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm border dark:border-zinc-700">
            <h2 className="text-2xl font-semibold mb-6 text-zinc-800 dark:text-white">Payment Information</h2>

            <form className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">Card Number</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">Expiry</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">CVV</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="123"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200"
              >
                Pay & Enroll
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          <p className="mb-6 text-center text-red-600 dark:text-red-400 font-medium">
            You need to be logged in to enroll in a course.
          </p>
          <div className="text-center">
            <Link
              to="/login"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Login Now
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Enroll;
