"use client";
import Image from "next/image";
import JumbotronImage from "@/public/assets/images/jumbotron.svg";
import JumbotronMobileImage from "@/public/assets/images/jumbotron-mobile.svg";
import JumbotronTabletImage from "@/public/assets/images/jumbotron-tablet.svg";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import MarketCryptosTypes from "@/src/types/marketCryptosTypes";

const getMarketPrice = async () => {
  const res = await fetch(
    "https://api.nobitex.ir/market/stats?srcCurrency=btc,usdt,eth,etc,doge,shib,trx&dstCurrency=rls,usdt"
  );
  const currencies = await res.json();
  return currencies;
};

export default function Home() {
  const [currencyByRLS, setCurrencyByRLS] = useState();
  const [currencyByUSDT, setCurrencyByUSDT] = useState();
  const { data, isLoading, isFetching, error } = useQuery<MarketCryptosTypes>({
    queryKey: ["market"],
    queryFn: () => getMarketPrice(),
    // refetchInterval: 10000,
  });

  useEffect(() => {
    const rlsCurrenctFilter: any = [];
    for (const iterator in data?.stats) {
      iterator.includes("rls") && rlsCurrenctFilter.push(data.stats[iterator]);
    }

    console.log(rlsCurrenctFilter);
  }, [data]);

  return (
    <body>
      <header className="w-full  ">
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet={JumbotronMobileImage.src}
            type="image/svg"
            sizes="1500"
          />
          <source
            media="(max-width: 768px)"
            srcSet={JumbotronTabletImage.src}
          />
          <Image className="" alt="nobitex" src={JumbotronImage} />
        </picture>
      </header>
      <main className=" h-fit container  mx-auto font-vazir">
        <section className="bg-white mx-auto p-2 rounded-lg z-10 relative lg:-mt-60  -mt-16 md:-mt-32 w-full ">
          <div className=" md:absolute md:-top-16 md:right-0 md:card md:bg-white md:w-96 flex flex-1 !flex-row justify-between md:items-center md:p-4">
            <span className="text-xs md:text-sm">انتخاب بازار براساس</span>
            <div className="join" dir="ltr">
              <input
                className="join-item btn btn-xs md:btn-sm "
                type="radio"
                name="market"
                aria-label="USDT تتر"
              />
              <input
                className="join-item btn btn-xs md:btn-sm"
                type="radio"
                name="market"
                checked={true}
                aria-label="IRT تومان"
              />
            </div>
          </div>
          <div className="overflow-x-auto my-4 ">
            <table className="table text-right">
              <thead>
                <tr className="text-gray-400">
                  <th>نام</th>
                  <th>آخرین قیمت</th>
                  <th>تغییرات 24h</th>
                  <th className="hidden md:table-cell">نمودار هفتگی</th>
                  <th className="block md:hidden"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="flex flex-1 items-center gap-x-2 ">
                      <img
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48Y2lyY2xlIGN4PSIyNSIgY3k9IjI1IiByPSIyNSIgZmlsbD0iI2Y3OTMxYSIvPjxwYXRoIGQ9Ik0zMS42NDQsMTguNTMxYy40OTEtMy4yNzUtMi01LjAzNi01LjQxNC02LjIxMWwxLjEwNi00LjQzNy0yLjctLjY3Mi0xLjA3OCw0LjMyYy0uNzA5LS4xNzgtMS40MzctLjM0NC0yLjE2NC0uNTA5TDIyLjQ4LDYuNjczLDE5Ljc4LDZsLTEuMTA2LDQuNDM2Yy0uNTg4LS4xMzQtMS4xNjYtLjI2Ni0xLjcyNS0uNDA2bDAtLjAxNC0zLjcyNS0uOTMtLjcxOSwyLjg4NHMyLC40NTksMS45NjMuNDg4YTEuNDM3LDEuNDM3LDAsMCwxLDEuMjU4LDEuNTcyTDE0LjQ3LDE5LjA4NGEyLjQsMi40LDAsMCwxLC4yODEuMDg5bC0uMjg2LS4wN0wxMi43LDI2LjE4NGEuOTg1Ljk4NSwwLDAsMS0xLjIzOS42NDFjLjAyOC4wMzktMS45NjItLjQ4OS0xLjk2Mi0uNDg5TDguMTU3LDI5LjQyN2wzLjUxNi44NzdjLjY1My4xNjQsMS4yOTQuMzM2LDEuOTIzLjVsLTEuMTE3LDQuNDg3LDIuNy42NzIsMS4xMDYtNC40MzdjLjczNy4yLDEuNDUzLjM4MywyLjE1My41NThsLTEuMSw0LjQxOSwyLjcuNjcyLDEuMTE3LTQuNDc4YzQuNjA2Ljg3Miw4LjA2OS41Miw5LjUyNy0zLjY0NSwxLjE3NS0zLjM1My0uMDU4LTUuMjg5LTIuNDgxLTYuNTVhNC4zMDUsNC4zMDUsMCwwLDAsMy40NDgtMy45NjZabS02LjE3Miw4LjY1M2MtLjgzMywzLjM1NS02LjQ4MSwxLjU0MS04LjMxMiwxLjA4NmwxLjQ4NC01Ljk0NUMyMC40NzYsMjIuNzgzLDI2LjM0NiwyMy42ODgsMjUuNDczLDI3LjE4NFptLjgzNi04LjdjLS43NjEsMy4wNTItNS40NjEsMS41LTYuOTg0LDEuMTJsMS4zNDQtNS4zOTFjMS41MjMuMzgsNi40MzQsMS4wODcsNS42NDEsNC4yN1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuNTg4IDMuMzc1KSIgZmlsbD0iI2ZmZiIvPjwvc3ZnPgo="
                        alt="bitcoin"
                        width={35}
                      />
                      <div className="flex flex-1 md:flex-row flex-col  justify-start items-center gap-x-4">
                        <span className="order-2 sm:order-1">BTC</span>
                        <span className="text-gray-400 text-sm order-1 sm:order-2">
                          بیتکوین
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex md:flex-row flex-col items-start  justify-center md:justify-start">
                      <span className="order-2 sm:order-1">1,398,999,000</span>
                      <span className="text-gray-400 text-sm order-1 sm:order-2 md:hidden">
                        قیمت
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex md:flex-row flex-col items-start  justify-center md:justify-start ">
                      <span className="order-2 sm:order-1 border-green-400 border bg-green-200 text-green-700 p-1 rounded mt-1 md:m-0">
                        +0.24
                      </span>
                      <span className="text-gray-400 text-sm order-1 sm:order-2 md:hidden">
                        تغییر 24h
                      </span>
                    </div>
                  </td>
                  <td className="hidden md:table-cell">نمودار</td>
                  <td className="hidden md:table-cell">
                    <button className="btn border border-green-600 bg-transparent text-green-600">
                      خرید و فروش
                    </button>
                  </td>
                  <td className="block md:hidden">...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </body>
  );
}
