export const BubbleText = ({ text }) => {
  return (
    <div className="px-4 py-7 text-center text-black">
      <div className="z-5 mt-auto flex w-full items-end justify-end">
        <div className="bubble order-1 max-w-xs bg-warning font-fell text-lg text-black">
          {text}
        </div>
      </div>
    </div>
  );
};
