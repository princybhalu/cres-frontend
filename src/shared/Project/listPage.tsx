import React, { useEffect, useState } from "react";
import PlusIcon from "../icons/plus-icon";
import { PROJECTS_LIST_VIEWS, DEBOUNCE_TIME } from "../../constants";
import GridIcon from "../icons/grid-icon";
import ListIcon from "../icons/list-icon";
import { ProjectForDashboard } from "../../interface/project";

import SearchIcon from "../icons/searchIcon";
import { getProjectListForDashboard } from "../../services/projectService";
import ProjectList from "./gridCards";
import ProjectListView from "./listView";
import { useNavigate } from "react-router-dom";

const ListPage = () => {
  const [CurrentView, setCurrentView] = useState(PROJECTS_LIST_VIEWS.GRID);
  const [searchMode, setSearchMode] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [debounceSearchQuery, setDebounceSearchQuery] = useState(null);
  const [currentlyAppliedFilter, setCurrentlyAppliedFilter] = useState({
    filter: null,
    search: null,
  });
  const [ProjectDetails, setProjectDetails] = useState(null);
  const navigate = useNavigate();


  /**
   * @method handleSearchInput
   * @param e
   * @description this function is used to handle search for the card view or list view
   */
  const handleSearchInput = (e: any) => {
    const { value } = e.target;
    const objectiveSearchValue = value.trim();
    setSearchString(value);

    if (debounceSearchQuery !== null) {
      clearTimeout(debounceSearchQuery);
    }

    setDebounceSearchQuery(
      //@ts-ignore
      setTimeout(() => {
        if (objectiveSearchValue.length > 0) {
          setCurrentlyAppliedFilter({
            ...currentlyAppliedFilter,
            search: value,
          });
        } else {
          setCurrentlyAppliedFilter({
            ...currentlyAppliedFilter,
            search: value,
          });
        }
      }, DEBOUNCE_TIME)
    );
  };

  const OnClickOnAddOfProject = () => {
    navigate("/project/add");
  };

  //   API CALLES
  const getProjectList = async () => {
    try {
      const { data: ProjectDetails } = await getProjectListForDashboard(
        currentlyAppliedFilter
      );
      console.log("ProjectDetails : " , ProjectDetails);
      
      setProjectDetails(ProjectDetails);
    } catch (err) {
      console.log("error in geting project list");
      console.log(err);
    }
  };

  //   useeffects
  useEffect(() => {
    getProjectList().then();
  }, []);

  return (
    <>
      {/* Header Of Project SEction */}
      <div className="p-2 flex flex-col md:flex-row justify-between items-center max-w-[1280px] mx-auto">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-md font-semibold mr-4 text-[#2f1380]">
            Projects (10)
          </h1>
          {/* moxfive serch theme */}
          {/* <div className={`flex ${searchMode ? "active rounded border-gray-700" : ""}`}>
            <span className={"searchicon"} onClick={() => setSearchMode(true)}>
              <SearchIcon />
            </span>

            {searchMode && (
              <input
                type="text"
                value={searchString}
                onChange={handleSearchInput}
                onBlur={() => !searchString.length && setSearchMode(false)}
                autoFocus
                className=""
              />
            )}
          </div> */}
          <input
            value={searchString}
            type="text"
            placeholder="Search"
            className="p-1 rounded border border-gray-300 focus:border-[var(--navbar-bg)] focus:outline-none w-full sm:w-1/2"
            onChange={handleSearchInput}
          />
        </div>
        <div className="flex items-center">
          <button
            className="text-[#ffffff] bg-[#2f1380] px-4 py-1 rounded mr-4 flex"
            onClick={OnClickOnAddOfProject}
          >
            <span className="mr-2">
              <PlusIcon />
            </span>
            Add
          </button>
          <div className="flex rounded border border-gray-300">
            <button
              className={`bg-gray-200 px-2 py-1 rounded ${CurrentView === PROJECTS_LIST_VIEWS.GRID ? "bg-white" : ""}  `}
              onClick={() => setCurrentView(PROJECTS_LIST_VIEWS.GRID)}
            >
              <GridIcon />
            </button>
            <button
              className={`bg-gray-200 px-2 py-1 rounded ${CurrentView === PROJECTS_LIST_VIEWS.LIST ? "bg-white" : ""} `}
              onClick={() => setCurrentView(PROJECTS_LIST_VIEWS.LIST)}
            >
              <ListIcon />
            </button>
          </div>
        </div>
      </div>

      {/* List of Progects */}
      {CurrentView === PROJECTS_LIST_VIEWS.GRID && (
        <>
          <ProjectList
            //@ts-ignore
            ProjectData={ProjectDetails}
          />
        </>
      )}
      {CurrentView === PROJECTS_LIST_VIEWS.LIST && (
        <>
          <ProjectListView
            //@ts-ignore
            ProjectData={ProjectDetails}
          />
        </>
      )}
    </>
  );
};

export default ListPage;
