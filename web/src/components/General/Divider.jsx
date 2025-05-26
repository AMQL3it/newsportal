const Divider = () => {
  return (
    <div className="flex justify-between items-center px-2 border-t border-gray-300 my-4">
      <button className="flex justify-center gap-1 text-white px-3 py-1.5 rounded bg-[var(--header-body-color)]">
        Previous
      </button>
      <button className="flex justify-center gap-1 text-white px-3 py-1.5 rounded bg-[var(--header-body-color)]">
        Next
      </button>
    </div>
  );
};

export default Divider;
