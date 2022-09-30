import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import formData from "form-data";

const Body = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [flower, setFlower] = useState({
    id: "",
    price: "",
    category: "",
    img: "",
    name: "",
    description:""
  });
  const [newFlowerModal, setNewFlowerModal] = useState(false);

  const fetchFlowers = async () => {
    const response = await fetch(
      "https://frozen-tundra-68521.herokuapp.com/api/flowers"
    ).then((response) => response.json());
    setData(response);
  };
  useEffect(() => {
    fetchFlowers();
  }, []);

  // deleting flower with filter method
  const deleteFlower = async (id) => {
    const response = await fetch(
      `https://frozen-tundra-68521.herokuapp.com/api/flowers${id}`,
      { method: "DELETE" }
    ).then((response) => response.json());
    fetchFlowers();
  };

  // adding new flower
  const addOpenModal = () => {
    setNewFlowerModal(true);
  };
  const addedFLower = async () => {

    const fileData = new formData();
    fileData.append("name", flower.name);
    fileData.append("price", flower.price);
    fileData.append("img", flower.img);
    fileData.append("category", flower.category);
    fileData.append("description", flower.description);

    const response = await fetch(
      `https://frozen-tundra-68521.herokuapp.com/api/flowers`,
      {
        method: "POST",
        body: fileData,
        //body: JSON.stringify(flower),
      }
    );
    fetchFlowers();
    setNewFlowerModal(false);
    setFlower({});
  };

  const addFlow = (e) => {
    setFlower({ ...flower, [e.target.name]: e.target.value });
  };

  const changeFlowerPhoto = (e) => {
    setFlower({ ...flower, img: (e.target.files[0]) });
  };
  // closing the modal and saving the flower after being edit
  const openModal = ({ flower }) => {
    setFlower(flower);
    setShowModal(true);
  };

  const updateFlowers = async (id) => {
    
    const response = await fetch(
      `https://frozen-tundra-68521.herokuapp.com/api/flowers/${id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(flower),
      }
    ).then((response) => response.json());
    fetchFlowers();
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
        {data &&
          data.map((flower, i) => (
            <div
              className=" bg-white	 text-black	 relative  rounded-xl overflow-hidden shadow-xl"
              key={i}
            >
              <a href={`/flowers/${flower.id}`}>
                <img
                  src={`${flower.img}`}
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
                  <a href={`/flowers/${flower.id}`}>
                    <span className="bg-white p-1 rounded-full">
                      {flower.price}$
                    </span>
                  </a>
                </div>

                <div className="mr-6 cursor-pointer">
                  <span className="mr-2">
                    <DeleteIcon
                      onClick={() => deleteFlower(flower.id)}
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
                  onClick={() => updateFlowers(flower.id)}
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
                  value={flower.category}
                  onChange={(e) => addFlow(e)}
                ></input>
              </div>
              <div className=" flex ">
                <h3 className="text-gray-700 font-semibold text-lg">Description: </h3>
                <textarea
                  className=" ml-2"
                  name="description"
                  value={flower.description}
                  onChange={(e) => addFlow(e)}
                ></textarea>
                </div>
              <div className=" flex ">
                <h3 className="text-gray-700 font-semibold text-lg">Photo: </h3>
                <input
                  type="file"
                  className=" ml-2"
                  name="img"
                  onChange={(e) => changeFlowerPhoto(e)}
                ></input>
              </div>
              <div className="w-full  text-center">
                <button
                  onClick={addedFLower}
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
      </div>
    </div>
  );
};

export default Body;
