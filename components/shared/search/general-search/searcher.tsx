import ErrorToast from "@/components/ui/error-toast";
import {
  searchStudents,
  searchInstructors,
  searchAdmins,
  searchCourses,
  searchContents,
  searchProjects,
} from "@/lib/search";
import SearchStateSetter from "./search-state-setter";

type SearcherProps = {
  query?: string;
  page?: string;
  tab?: string;
};

const Searcher = async ({ query, page, tab }: SearcherProps) => {
  if (!query || !tab) {
    return null;
  }

  const currentPage = parseInt(page || "1", 10);
  const itemsPerPage = 10;

  let searchResults: {
    data: any[];
    total: number;
    type:
      | "students"
      | "instructors"
      | "admins"
      | "courses"
      | "contents"
      | "projects"
      | "unknown";
  } = {
    data: [],
    total: 0,
    type: "unknown",
  };

  try {
    switch (tab) {
      case "students": {
        const { students, totalStudents } = await searchStudents(
          query,
          currentPage,
          itemsPerPage
        );
        searchResults = {
          data: students,
          total: totalStudents,
          type: "students",
        };
        break;
      }
      case "instructors": {
        const { instructors, totalInstructors } = await searchInstructors(
          query,
          currentPage,
          itemsPerPage
        );
        searchResults = {
          data: instructors,
          total: totalInstructors,
          type: "instructors",
        };
        break;
      }
      case "admins": {
        const { admins, totalAdmins } = await searchAdmins(
          query,
          currentPage,
          itemsPerPage
        );
        searchResults = {
          data: admins,
          total: totalAdmins,
          type: "admins",
        };
        break;
      }
      case "courses": {
        const { courses, totalCourses } = await searchCourses(
          query,
          currentPage,
          itemsPerPage
        );
        searchResults = {
          data: courses,
          total: totalCourses,
          type: "courses",
        };
        break;
      }
      case "contents": {
        const { contents, totalContents } = await searchContents(
          query,
          currentPage,
          itemsPerPage
        );
        searchResults = {
          data: contents,
          total: totalContents,
          type: "contents",
        };
        break;
      }
      case "projects": {
        const { projects, totalProjects } = await searchProjects(
          query,
          currentPage,
          itemsPerPage
        );
        searchResults = {
          data: projects,
          total: totalProjects,
          type: "projects",
        };
        break;
      }
      default:
        searchResults = {
          data: [],
          total: 0,
          type: "unknown",
        };
        return <SearchStateSetter searchResults={searchResults} />;
    }

    return <SearchStateSetter searchResults={searchResults} />;
  } catch (error) {
    return <ErrorToast error={"Error searching: " + error} />;
  }
};

export default Searcher;
