const PageNavigation = ({ updatePage }) => {
  return (
    <div className="my-8 flex justify-center">
      <button className="px-2 text-lg" onClick={() => updatePage("back")}>
        Previous
      </button>
      <button className="px-2 text-lg" onClick={() => updatePage("next")}>
        Next
      </button>
    </div>
  );
};

export default PageNavigation;
