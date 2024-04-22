import React from "react";

const TrashBar = (props) => {

    const handleDeleteNote = ()=>{

    }

  return (
    <div
      className={
        "text-center fst-italic mt-2 " +
        (props.toggleSidebar ? "col-10 " : "col-12 ") +
        (props.isDark ? "text-light" : "text-dark")
      }
    >
      <div className="row">
        <div className="col-12">
          Notes will be deleted automatically after 7 days <button className="btn btn-danger text-light">Delete All</button>
        </div>
      </div>
    </div>
  );
};

export default TrashBar;
