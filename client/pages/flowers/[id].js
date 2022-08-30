import flowers from "../../data.json";
import Image from "next/image";

export default function Home(props) {
  const currentFlower = flowers.find(
    (flower) => `${flower.productId}` === props.id
  );

  return (
    <div
      className=" bg-yellow-50 h-250	 text-black pl-10  rounded-xl overflow-hidden shadow-xl"
      key={"e"}
    >
      <p className=" pt-10  pl-44 font-bold text-5xl">{currentFlower?.name}</p>
      <Image
        src={`/${currentFlower?.photo}`}
        className="w-100 h-100  mt-14 object-cover rounded-xl"
      />
      <div className="m-5 ml-10">
        <span className="   text-lg font-bold">{currentFlower?.price}$</span>
        <span className="block text-gray-500   text-base ">
          {currentFlower?.category}
        </span>
      </div>
      <div className=" text-lg  ml-10">
        <span>{currentFlower?.instructions}</span>
      </div>
    </div>
  );
}
export function getStaticProps(ctx) {
  const { id } = ctx.params;

  return {
    props: { id },
  };
}

export function getStaticPaths() {
  const paths = [];
  return {
    paths,
    fallback: "blocking",
  };
}
