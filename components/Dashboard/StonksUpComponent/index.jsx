import stonksUp from "@/public/stonksUp.png";
import stonksDown from "@/public/stonksDown.png";
import NIRF from "@/public/NIRF.png";
import hired from "@/public/hired.png";
import planhire from "@/public/planhire.png";

import Image from "next/image";
import RadialGauge from "../RadialGauge";

export default function StonksUpComponent({ title, count, stonksType = 2 }) {
  console.log(count);
  return (
    <div
      className={
        stonksType < 6
          ? "mb-3 md:mb-6 py-2 bg-white rounded-xl shadow "
          : "mb-3 md:mb-6 py-2 h-32 bg-white rounded-xl shadow"
      }
    >
      <div className={stonksType < 6 ? "" : "grid grid-cols-7 gap-0"}>
        <div className="col-span-4 flex flex-col">
          <h1 className="ml-6 font-DMSANS text-sm text-gray-600 text-left font-medium my-2">
            {title}
          </h1>
          <div class="pb-2 flex gap-2">
            <div class="ml-6 flex items-center">
              <h1 class="font-DMSANS font-medium text-black text-center text-lg md:text-2xl lg:text-lg xl:text-4xl">
                {count < 10 ? `0${count}` : count}
              </h1>
            </div>
            <div class="my-auto ml-auto mr-4 flex items-center gap-1">
              {stonksType < 6 ? (
                <Image
                  src={
                    stonksType === 1
                      ? NIRF
                      : stonksType === 2
                      ? stonksUp
                      : stonksType === 3
                      ? stonksDown
                      : stonksType === 4
                      ? planhire
                      : stonksType === 5
                      ? hired
                      : ""
                  }
                  alt="stonks up"
                  class={
                    stonksType !== 1
                      ? stonksType === 4 || stonksType === 5
                        ? "w-7 h-7"
                        : "w-6 h-6"
                      : "w-8 h-8"
                  }
                />
              ) : (
                <></>
              )}
              {stonksType === 1 ? (
                <></>
              ) : stonksType === 2 ? (
                <span className="text-xs font-Heading">+10% inc</span>
              ) : stonksType === 3 ? (
                <span className="text-xs font-Heading">-10% dec</span>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        {stonksType >= 6 ? (
          stonksType === 6 ? (
            <RadialGauge score={0} color="#FFA600" />
          ) : stonksType === 7 ? (
            <RadialGauge score={0} color="#56CCF2" />
          ) : stonksType === 8 ? (
            <RadialGauge score={0} color="#FFB7B7" />
          ) : stonksType === 9 ? (
            <RadialGauge score={0} color="#FF5531" />
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
