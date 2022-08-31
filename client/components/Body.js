import { useUser } from "@auth0/nextjs-auth0";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import flowersJson from "../data.json";

const Body = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [flower, setFlower] = useState({});
  const [newFlowerModal, setNewFlowerModal] = useState(false);
  useEffect(() => {
    setData(flowersJson);
  }, []);

  // deleting flower with filter method
  const deleteFlower = (id) => {
    const modifiedFlowers = data.filter(
      (flower) => flower.productId !== Number(id)
    );
    setData(modifiedFlowers);
  };

  // adding new flower
  const addOpenModal = () => {
    setNewFlowerModal(true);
  };
  const addedFLower = () => {
    const modifiedFlowers = [...data, flower];

    setData(modifiedFlowers);
    setNewFlowerModal(false);
    setFlower({});
  };

  const addFlow = (e) => {
    setFlower({ ...flower, [e.target.name]: e.target.value });
  };

  const changeFlowerPhoto = (e) => {
    setFlower({ ...flower, photo: URL.createObjectURL(e.target.files[0]) });
  };
  // closing the modal and saving the flower after being edit
  const openModal = ({ flower }) => {
    setFlower(flower);
    setShowModal(true);
  };

  const updateFlowers = (id) => {
    const newFlower = data.map((f) => {
      if (f.productId === id) {
        return {
          ...f,
          name: flower.name,
          price: flower.price,
          category: flower.category,
        };
      }

      return f;
    });
    setData(newFlower);
    setShowModal(false);
    setFlower({});
  };

  const changeFlow = (e) => {
    setFlower({ ...flower, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className=" flex   justify-end mt-6 ">
        <div className="flex rounded-xl hover:bg-gray-50 mr-16 shadow-xl cursor-pointer text-xl bg-white h-10 items-center">
          <AddCircleIcon className="text-indigo-900 mx-1  " />
          <button
            className=" pr-2  font-semi-bold"
            onClick={() => addOpenModal({ flower })}
          >
            Add Flower
          </button>
        </div>
      </div>
      <div className=" flowers  relative">
        {data.map((flower, i) => (
          <div
            className=" bg-white	 text-black	 relative  rounded-xl overflow-hidden shadow-xl"
            key={i}
          >
            <a href={`/flowers/${flower.productId}`}>
              <img
                src={`${flower.photo}`}
                className=" w-full h-80 object-cover rounded-xl "
              />
              <div className="m-5">
                <span className="   text-lg font-bold">{flower.name}</span>
                <span className="block text-gray-500   text-base ">
                  {flower.category}
                </span>
              </div>
            </a>

            <div className=" flex opacity-0 hover:opacity-100 cursor-pointer  	w-full justify-between  text-md uppercase   absolute  top-2 ml-2 font-bold rounded-full">
              <div className=" ">
                <a href={`/flowers/${flower.productId}`}>
                  <span className="bg-white p-1 rounded-full">
                    {flower.price}$
                  </span>
                </a>
              </div>

              <div className="mr-6 cursor-pointer">
                <span className="mr-2">
                  <DeleteIcon
                    onClick={() => deleteFlower(flower.productId)}
                    className=" hover:animate-bounce  text-indigo-900 w-8 h-8  bg-white rounded-full"
                  />
                </span>
                <span className="  ml-4   ">
                  <EditIcon
                    onClick={() => openModal({ flower })}
                    className="hover:animate-bounce text-indigo-900  w-8 h-8 bg-white rounded-full"
                  />
                </span>
              </div>
            </div>
          </div>
        ))}
        {/* edit flower modal */}
        <div className="fixed xl:w-150 xl: xl:ml-80  md:w-2/4 md:ml-48 md: sm:mt- sm:ml-16">
          {showModal ? (
            <div className="grid bg-slate-300 items-center  pl-10   rounded-2xl shadow-2xl h-96 border border-white   ">
              <div className="  text-center text-gray-700 font-bold text-4xl">
                <h1>Edit Flower</h1>
              </div>
              <div className=" flex  ">
                <h3 className="text-gray-700 font-semibold text-lg">
                  Change Name:{" "}
                </h3>
                <input
                  className=" ml-3 font-semibold text-gray-700  "
                  name="name"
                  onChange={(e) => changeFlow(e)}
                  value={flower.name}
                ></input>
              </div>
              <div className=" flex  ">
                <h3 className=" text-gray-700 font-semibold text-lg">
                  Change Price:{" "}
                </h3>
                <input
                  className=" ml-5 font-semibold  text-gray-700 "
                  name="price"
                  onChange={(e) => changeFlow(e)}
                  value={flower.price}
                ></input>
              </div>
              <div className=" flex ">
                <h3 className="text-gray-700 font-semibold text-lg ">
                  Change Category:{" "}
                </h3>
                <input
                  className="text-gray-700 font-semibold  ml-2 "
                  name="category"
                  onChange={(e) => changeFlow(e)}
                  value={flower.category}
                ></input>
              </div>
              <div className="w-full  text-center">
                <button
                  onClick={() => updateFlowers(flower.productId)}
                  className=" bg-blue-700 h-10 w-36 text-white text-lg rounded-md border  hover:text-black shadow-sm font-medium  hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 "
                >
                  Save Changes
                </button>
              </div>
              <div className="w-full text-end">
                <button
                  className="bg-blue-700 h-9 w-24 mr-8 text-lg rounded-md border  hover:bg-white hover:text-black shadow-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 "
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          ) : null}
        </div>
        <div className="fixed xl:w-150 xl: xl:ml-80  md:w-2/4 md:ml-48 md: sm:mt- sm:ml-16">
          {newFlowerModal ? (
            <div className="grid bg-slate-300 items-center  pl-10   rounded-2xl shadow-2xl h-96 border border-white   ">
              <div className="  text-center text-gray-700 font-bold text-4xl">
                <h1>Add New Flower</h1>
              </div>
              <div className=" flex  ">
                <h3 className="text-gray-700 font-semibold text-lg">Name: </h3>
                <input
                  className=" ml-3 font-semibold text-gray-700  "
                  name="name"
                  onChange={(e) => addFlow(e)}
                  value={flower.name}
                ></input>
              </div>
              <div className=" flex  ">
                <h3 className=" text-gray-700 font-semibold text-lg">
                  Price:{" "}
                </h3>
                <input
                  className=" ml-5 font-semibold  text-gray-700 "
                  name="price"
                  onChange={(e) => addFlow(e)}
                  value={flower.price}
                ></input>
              </div>
              <div className=" flex ">
                <h3 className="text-gray-700 font-semibold text-lg ">
                  Category:{" "}
                </h3>
                <input
                  className="text-gray-700 font-semibold  ml-2 "
                  name="category"
                  onChange={(e) => addFlow(e)}
                ></input>
              </div>
              <div className=" flex ">
                <h3 className="text-gray-700 font-semibold text-lg">Photo: </h3>
                <input
                  type="file"
                  className=" ml-2"
                  name="photo"
                  onChange={(e) => changeFlowerPhoto(e)}
                ></input>
              </div>
              <div className="w-full  text-center">
                <button
                  onClick={() => addedFLower({ flower })}
                  className=" bg-blue-700 h-10 w-36 text-white text-lg rounded-md border  hover:text-black shadow-sm font-medium  hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 "
                >
                  Add Flower
                </button>
              </div>
              <div className="w-full text-end">
                <button
                  className="bg-blue-700 h-9 w-24 mr-8 text-lg rounded-md border  hover:bg-white hover:text-black shadow-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 "
                  onClick={() => setNewFlowerModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          ) : null}
        </div>
        {/* add flowers modal */}{" "}
        {/* <div className="fixed flex justify-end  w-full ">
          <div className=" xl:w-150 md:w-100 sm:w-80 mr-28">
            <div className=" ">
              {newFlowerModal ? (
                <div className="grid   bg-indigo-900 items-center  pl-10   rounded-2xl shadow-xl xl:h-120 md:h-120 sm:h-120  h-100">
                  <div className="  text-center text-white text-4xl">
                    <h1>Add New Flower</h1>
                  </div>
                  <div className=" flex  ">
                    <h3 className="text-white text-lg"> Name: </h3>
                    <input
                      className=" ml-3"
                      name="name"
                      onChange={(e) => addFlow(e)}
                      value={flower.name}
                    ></input>
                  </div>
                  <div className=" flex  ">
                    <h3 className="text-white text-lg">Price: </h3>
                    <input
                      className=" ml-5"
                      name="price"
                      onChange={(e) => addFlow(e)}
                      value={flower.price}
                    ></input>
                  </div>
                  <div className=" flex ">
                    <h3 className="text-white">Category: </h3>
                    <input
                      className=" ml-2"
                      name="category"
                      onChange={(e) => addFlow(e)}
                      value={flower.category}
                    ></input>
                  </div>
                  <div className=" flex ">
                    <h3 className="text-white">Photo: </h3>
                    <input
                      type="file"
                      className=" ml-2"
                      name="photo"
                      onChange={(e) => changeFlowerPhoto(e)}
                    ></input>
                  </div>
                  <div className="w-full  text-center">
                    <button
                      onClick={() => addedFLower({ flower })}
                      className="bg-white h-10 w-36 text-lg rounded-md border  hover:border-gray-300 shadow-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 "
                    >
                      Add Flower
                    </button>
                  </div>
                  <div className="w-full text-end">
                    <button
                      className="bg-white h-9 w-24 mr-8 text-lg rounded-md border  hover:border-gray-300 shadow-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 "
                      onClick={() => setNewFlowerModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Body;
