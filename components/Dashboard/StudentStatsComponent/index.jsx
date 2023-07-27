export default function StudentStatsComponent() {
    return (
      <div className="bg-white mx-auto py-8 px-10">
        <h2 className="text-4xl font-bold mb-6">Branch-wise Statistics</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="p-4 text-left">Branch</th>
                <th className="p-4 text-left">Grads</th>
                <th className="p-4 text-left">Reg Students</th>
                <th className="p-4 text-left">Placed Students</th>
                <th className="p-4 text-left">Max CTC</th>
                <th className="p-4 text-left">Med CTC</th>
                <th className="p-4 text-left">Avg CTC</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b-2 border-gray-300">
                <td className="p-4 text-left">CSE</td>
                <td className="p-4 text-left">100</td>
                <td className="p-4 text-left">500</td>
                <td className="p-4 text-left">400</td>
                <td className="p-4 text-left">20 LPA</td>
                <td className="p-4 text-left">12 LPA</td>
                <td className="p-4 text-left">16 LPA</td>
              </tr>
              <tr className="border-b-2 border-gray-300">
                <td className="p-4 text-left">ECE</td>
                <td className="p-4 text-left">100</td>
                <td className="p-4 text-left">500</td>
                <td className="p-4 text-left">400</td>
                <td className="p-4 text-left">20 LPA</td>
                <td className="p-4 text-left">12 LPA</td>
                <td className="p-4 text-left">16 LPA</td>
              </tr>
              <tr className="border-b-2 border-gray-300">
                <td className="p-4 text-left">MECH</td>
                <td className="p-4 text-left">100</td>
                <td className="p-4 text-left">500</td>
                <td className="p-4 text-left">400</td>
                <td className="p-4 text-left">20 LPA</td>
                <td className="p-4 text-left">12 LPA</td>
                <td className="p-4 text-left">16 LPA</td>
              </tr>
              <tr className="border-b-2 border-gray-300">
                <td className="p-4 text-left">EEE</td>
                <td className="p-4 text-left">100</td>
                <td className="p-4 text-left">500</td>
                <td className="p-4 text-left">400</td>
                <td className="p-4 text-left">20 LPA</td>
                <td className="p-4 text-left">12 LPA</td>
                <td className="p-4 text-left">16 LPA</td>
              </tr>
              <tr className="border-b-2 border-gray-300">
                <td className="p-4 text-left">CE</td>
                <td className="p-4 text-left">100</td>
                <td className="p-4 text-left">500</td>
                <td className="p-4 text-left">400</td>
                <td className="p-4 text-left">20 LPA</td>
                <td className="p-4 text-left">12 LPA</td>
                <td className="p-4 text-left">16 LPA</td>
              </tr>
              <tr>
                <td className="p-4 text-left">ASE</td>
                <td className="p-4 text-left">100</td>
                <td className="p-4 text-left">500</td>
                <td className="p-4 text-left">400</td>
                <td className="p-4 text-left">20 LPA</td>
                <td className="p-4 text-left">12 LPA</td>
                <td className="p-4 text-left">16 LPA</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  