import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../../General/Pagination";
import Table from "./Table";

const Content = ({theadInfo, tbodyInfo}) => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const handleEdit = (cat) => {
    console.log("Edit button press ...");
  };

  const handleDelete = async (id) => {
    console.log("Delete button press ....")
  };

  const handleView = async (id) => {
    console.log("View button press ...");
  };

  const tabMethods = {
    onView: handleView,
    onEdit: handleEdit, 
    onDelete: handleDelete
  };

  // Pagination
  const displayPerPage = 5;
  const totalPages = Math.ceil(tbodyInfo.length / displayPerPage);
  const startIndex = (currentPage - 1) * displayPerPage;
  const displayedtbodInfo = tbodyInfo.slice(startIndex, startIndex + displayPerPage);

  return (
    <div>

      {/* <Table theadInfo={theadInfo} tbodyInfo={displayedtbodInfo}  tabMethods={tabMethods}/> */}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

    </div>
  );
};

export default Content;
