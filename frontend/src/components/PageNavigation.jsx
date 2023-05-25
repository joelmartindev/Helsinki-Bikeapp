const PageNavigation = ({ updatePage }) => {
  return (
    <>
      <button onClick={() => updatePage()}>Next</button>
    </>
  );
};

export default PageNavigation;
