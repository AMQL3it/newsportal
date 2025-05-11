const Loading = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-3 gap-2 md:grid-cols-3 sm:grid-cols-2">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-gray-200 h-48 w-full rounded overflow-hidden shadow"
        >
          <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
