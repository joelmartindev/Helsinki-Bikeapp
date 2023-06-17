const PageNavigation = ({ updatePage, totalPages, currentPage }) => {
  return (
    <div className="my-4 flex justify-center">
      <button
        className="px-2 text-lg text-custom-isabelline"
        onClick={() => updatePage("back")}
      >
        Previous
      </button>
      {totalPages ? (
        <div className="text-custom-isabelline">
          {currentPage + " / " + totalPages}
        </div>
      ) : (
        <div className="text-custom-isabelline">{currentPage + " / ..."}</div>
      )}
      <button
        className="px-2 text-lg text-custom-isabelline"
        onClick={() => updatePage("next")}
      >
        Next
      </button>
    </div>
  );
};

export default PageNavigation;
