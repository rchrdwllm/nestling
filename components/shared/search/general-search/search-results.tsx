import { useSearchStore } from "@/context/search-context";
import React from "react";
import StudentCard from "../student-card";
import InstructorCard from "../instructor-card";
import AdminCard from "../admin-card";
import CourseCard from "../course-card";
import ContentCard from "../content-card";
import ProjectCard from "../project-card";

type SearchResultsProps = {
  isInbox?: boolean;
};

const SearchResults = ({ isInbox }: SearchResultsProps) => {
  const { data, type } = useSearchStore();

  switch (type) {
    case "students":
      return (
        <section>
          {data.length ? (
            data.map((item) => (
              <StudentCard key={item.id} {...item} isInbox={isInbox} />
            ))
          ) : (
            <p>No results found.</p>
          )}
        </section>
      );
    case "instructors":
      return (
        <section>
          {data.length ? (
            data.map((item) => (
              <InstructorCard key={item.id} {...item} isInbox={isInbox} />
            ))
          ) : (
            <p>No results found.</p>
          )}
        </section>
      );
    case "admins":
      return (
        <section>
          {data.length ? (
            data.map((item) => (
              <AdminCard key={item.id} {...item} isInbox={isInbox} />
            ))
          ) : (
            <p>No results found.</p>
          )}
        </section>
      );
    case "courses":
      return (
        <section>
          {data.length ? (
            data.map((item) => <CourseCard key={item.id} {...item} />)
          ) : (
            <p>No results found.</p>
          )}
        </section>
      );
    case "contents":
      return (
        <section>
          {data.length ? (
            data.map((item) => <ContentCard key={item.id} {...item} />)
          ) : (
            <p>No results found.</p>
          )}
        </section>
      );
    case "projects":
      return (
        <section>
          {data.length ? (
            data.map((item) => <ProjectCard key={item.id} {...item} />)
          ) : (
            <p>No results found.</p>
          )}
        </section>
      );
  }
};

export default SearchResults;
