import { useState, useEffect } from "react";
import { Spin } from "antd";

import { getTierOffers } from "@/redux/Sagas/requests/features";
import { openNotification, notificationTypes } from "@/utils/notifications";

export default function TierTableComponent() {
  const [tierOffers, setTierOffers] = useState(null);

  useEffect(() => {
    getTierOffers()
      .then((res) => {
        if (res.data.status === 200) {
          let responseData = res.data.data;
          responseData = Object.keys(responseData).map((tier) => ({
            tier,
            offers: responseData[tier],
          }));
          setTierOffers(responseData);
        } else {
          openNotification(
            notificationTypes.ERROR,
            "Error in fetching Tier Offers"
          );
        }
      })
      .catch((err) => {
        openNotification(
          notificationTypes.ERROR,
          "Error",
          "Error in fetching Tier Offers"
        );
      });
  }, []);

  return (
    <div class="bg-white rounded-lg p-4">
      <h2 class="ml-3 mt-2 mb-3 text-2xl font-bold mb-2">Tier Offers</h2>
      <table class="w-full">
        {tierOffers === null ? (
          <div className="flex justify-center items-center">
            <Spin size="large" />
          </div>
        ) : Object.keys(tierOffers).length === 0 ? (
          <tr class="border-b border-gray-300">
            <td class="py-2 px-4 text-base md:text-xl font-medium">No Tiers</td>
          </tr>
        ) : (
          tierOffers.map((tierOffer) => (
            <tr class="border-b border-gray-300">
              <td class="py-2 px-4 text-base md:text-xl font-medium">
                {tierOffer.tier}
              </td>
              <td class="py-2 px-4 text-base md:text-xl text-left font-medium">
                {tierOffer.offers} offers
              </td>
            </tr>
          ))
        )}
      </table>
    </div>
  );
}
