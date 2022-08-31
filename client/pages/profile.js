import { useUser } from "@auth0/nextjs-auth0";

const Xoni = () => {
  const { user, error, isLoading } = useUser();

  return (
    <div className="grid  max-h-screen min-h-screen w-full">
      <div className=" w-full h-24 flex justify-between items-center bg-slate-400">
        <div className="ml-4 text-3xl font-semibold rounded-xl bg-slate-100">
          <p className=" pl-6 pr-2 ">Welcome to your Profile</p>
        </div>
        <div className="flex rounded-xl bg-white font-semibold">
          <p className="pl-3 rounded-r-none  text-xl pr-4">
            Your loged in as :{" "}
          </p>
          <p className="  rounded-xl rounded-l-none pr-10 ">{user?.name}</p>
        </div>
      </div>
      <div className="w-full flex justify-center h-screen  bg-white">
        <div className="mt-20  w-100 bg-slate-400 rounded-3xl">
          <div className=" bg- flex justify-center ">
            <hr></hr>
            <img
              className="w-40 h-40  rounded-full object-cover mt-8 shadow-xl   "
              src={user?.picture}
            ></img>
          </div>
          <div className="text-center text-4xl mt-12">
            <p>Hi {user?.nickname}</p>
          </div>
          <div className="mt-10 justify-center items-center pl-20">
            <br></br>
            <p>We are having some unexpected problems! </p>
            <br></br>
            <p>
              were gonna be back soon and until then we hope that you stay
              healthy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Xoni;
