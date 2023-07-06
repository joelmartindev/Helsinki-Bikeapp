import { ReactComponent as ChevronLeft } from "../assets/chevron-left.svg";
import { ReactComponent as ChevronRight } from "../assets/chevron-right.svg";

const PageNavigation = ({
  updatePage,
  totalPages,
  availablePages,
  currentPage,
}) => {
  let pages;

  if (availablePages === null) {
    pages = totalPages;
  } else {
    pages = availablePages;
  }

  return (
    <div className="my-4 flex justify-center">
      <div className="flex items-center rounded-lg bg-custom-isabelline">
        <button
          className="rounded-s-lg bg-custom-isabelline px-2 py-3 font-semibold text-gray-800 hover:bg-gray-300"
          onClick={() => updatePage("back")}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        {totalPages ? (
          <div className="border-l border-r border-gray-300 px-4 py-2 text-xl text-custom-text">
            {currentPage + " / " + pages}
          </div>
        ) : (
          <div className="border-l border-r border-gray-300 px-6 py-2 text-xl text-custom-text">
            {currentPage + " / ... "}
          </div>
        )}
        <button
          className="rounded-e-lg bg-custom-isabelline px-2 py-3 font-semibold text-gray-800 hover:bg-gray-300"
          onClick={() => updatePage("next")}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default PageNavigation;
