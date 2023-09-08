import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import SearchRightbar from "../../components/searchRightbar/SearchRightbar";
import "./search.scss";
import Exercises from "../../components/Exercises";

const Search = () => {
  const [bodyPart, setBodyPart] = useState("all");
  const [exercises, setExercises] = useState([]);

  return (
    <div className="search">
      <div className="searchContainer">
        <Sidebar />
        <div className="contentContainer">
          <SearchRightbar
            setExercises={setExercises}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
          />
          <Exercises
            setExercises={setExercises}
            exercises={exercises}
            bodyPart={bodyPart}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
