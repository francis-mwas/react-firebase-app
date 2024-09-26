const Plan = ({ plan }) => {
  console.log('The blan: ', plan);

  return (
    <div className="border rounded-xl p-3 mt-2 flex gap-5">
      <img src="/placeholder.jpg" className="w-[130px] h-[130px] rounded-xl" />
      {plan?.map((item) => (
        <div key={item.place}>
          <h2 className="font-bold text-lg">{item?.place}</h2>
        </div>
      ))}
    </div>
  );
};

export default Plan;
