import Search from "../components/Search";
import { useEffect, useState } from "react";

export default function Home(props) {
  const [data, setData] = useState(null);

  const fetchFlowers = async () => {
    const response = await fetch(
      "https://frozen-tundra-68521.herokuapp.com/api/flowers"
    ).then((response) => response.json());
    setData(response);
  };

  useEffect(() => {
    fetchFlowers();
  }, []);

  return (
    <div className="  bg-yellow-100 h-full	">
      <div className="flex py-10  justify-between">
        <div>
          <p className="text-5xl text-gray-700 font-semibold pl-20 pt-6">
            Flower Shop
          </p>
        </div>
        <div className="  pr-10 ">
          <Search data={data} />
        </div>
      </div>

      <div className="  grid lg:grid-cols-3 lg:gap-16 xl:gap-24 md:grid-cols-2 md:gap-12 sm:grid-cols-1 gap-8 relative bg-yellow-100		  px-28 mt-10 ">
        {data &&
          data.map((flower, i) => (
            <div
              className=" bg-yellow-50	 text-black	 relative  rounded-xl overflow-hidden shadow-xl"
              key={i}
            >
              <a href={`/flowers/${flower.id}`}>
                <img
                  src={`${flower.img}`}
                  className="w-full h-80 object-cover rounded-xl"
                />
                <div className="m-5">
                  <span className="   text-lg font-bold">{flower.name}</span>
                  <span className="block text-gray-500   text-base ">
                    {flower.category}
                  </span>
                </div>
              </a>
              <div className="flex   text-md uppercase p-1  absolute  top-2 ml-2 font-bold rounded-full">
                <div className="pr-48">
                  <span className="bg-white rounded-full">{flower.price}$</span>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className=" w-full   h-80 pt-26 pr-10 flex justify-end items-center">
        <div>
          <p className=" text-xl  font-bold"> Contact Us On:</p>
        </div>
        <div className="pl-2  font-semibold text-xl  ">
          <a href="#">
            <p> flowershop@gmail.com</p>
            <p>+38349221221</p>
            <p> facebook.com/flowershop</p>
          </a>
        </div>
      </div>
    </div>
  );
}
