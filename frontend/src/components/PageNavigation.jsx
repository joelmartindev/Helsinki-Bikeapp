const PageNavigation = ({ updatePage, totalPages, currentPage }) => {
  return (
    <div className="my-4 flex justify-center">
      <button className="px-2 text-lg" onClick={() => updatePage("back")}>
        Previous
      </button>
      {totalPages ? (
        <div>{currentPage + " / " + totalPages}</div>
      ) : (
        <div>{currentPage + " / ..."}</div>
      )}
      <button className="px-2 text-lg" onClick={() => updatePage("next")}>
        Next
      </button>
    </div>
  );
};

export default PageNavigation;
