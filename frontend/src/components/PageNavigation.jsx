const PageNavigation = ({ updatePage }) => {
  return (
    <div className="flex justify-center">
      <button className="px-2 py-2" onClick={() => updatePage("back")}>
        Previous
      </button>
      <button className="px-2 py-2" onClick={() => updatePage("next")}>
        Next
      </button>
    </div>
  );
};

export default PageNavigation;
