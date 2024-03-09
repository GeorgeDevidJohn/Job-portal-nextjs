import { useState } from "react";

function ApplyFilter({ onApplyFilter }: { onApplyFilter: (filters: Record<string, string>) => void }) {
  const [category, setCategory] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const filters: Record<string, string> = {};
    if (category) filters.category = category;
    if (type) filters.type = type;
    if (location) filters.location = location;
    onApplyFilter(filters);
  }

  return (
      <>
       <form onSubmit={handleSubmit}>
              <div className="mt-10 sm:mt-20 flex flex-row gap-x-4 gap-y-4 items-end justify-center flex-wrap">
                <div className=".space-y-2 flex flex-col items-center">
                  <label className="text-gray-600 mr-2">Category</label>
                  <select
                    id="category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-700 text-sm mt-2 focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select Category</option>
                    <option value="IT">IT</option>
                    <option value="Business">Business</option>
                    <option value="Health">Health</option>
                    <option value="Sales">Sales</option>
                    <option value="Art">Art</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div
                  className="space-y-2 flex flex-col items-center"
                >
                  <label className="text-gray-600 mr-2">Type</label>
                  <select
                    id="type"
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                    className="bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-700 text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
                <div className="space-y-2 flex flex-col items-center">
                  <label className="text-gray-600 mr-2">Location</label>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    className="bg-white border border-gray-300 rounded-md py-2 px-3 w-42 text-gray-700 text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Enter City or Country"
                  />
                </div>
                <div className="space-y-2 flex flex-col items-center">
                  <label className="text-gray-600 mr-2"></label>
                  <button
                    type="submit"
                    className=" py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    Apply Filter
                  </button>
                </div>
              </div>
            </form>
      </>
  )
}
export default ApplyFilter;