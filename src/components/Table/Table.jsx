import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { welbexAPI } from "../../api";
import Sorter from "../Sorter/Sorter";

const S = {};
S.Table = styled.table`
  background-color: #6d113f;
  color: white;
  text-align: center;
  border-radius: 20px;
  th {
    padding: 15px;
  }
  td {
    padding: 15px;
    border-top: 1px solid white;
    border-right: 1px solid white;
  }
`;

S.Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 10px;
`;

function Table() {
  //Data
  const [data, setData] = useState();
  const [pageData, setPageData] = useState(null);
  //Sorted Data
  const [sortedData, setSortedData] = useState(data);
  const [sortedPageData, setSortedPageData] = useState();
  const [isSorted, setIsSorted] = useState(false);
  //Pagination
  const [pageNumber] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  let itemsOnPage = 5;
  let pagesCount = totalItems / itemsOnPage;

  //Fetch all data from api
  useEffect(() => {
    if (!isSorted) {
      welbexAPI
        .getData()
        .then((res) => {
          setData(res.data);
          setTotalItems(res.length);
        })
        .catch((error) => {
          return error;
        });
    }
  });

  useEffect(() => {
    if (sortedData) {
      setIsSorted(true);
    }
  }, [sortedData]);

  //Show data related to selected page
  useEffect(() => {
    if (!isSorted) {
      welbexAPI
        .getByPage(pageNumber, itemsOnPage)
        .then((res) => {
          setPageData(res);
        })
        .catch((error) => {
          return error;
        });
    }
  }, [pageNumber]);

  return (
    <S.Container>
      <Sorter
        setSortedData={setSortedData}
        welbexAPI={welbexAPI}
        itemsOnPage={itemsOnPage}
        setSortedPageData={setSortedPageData}
        setPageData={setPageData}
        isSorted={isSorted}
        setIsSorted={setIsSorted}
        pagesCount={pagesCount}
        setTotalItems={setTotalItems}
      />
      <S.Table>
        <tr>
          <th>Дата</th>
          <th>Название</th>
          <th>Количество</th>
          <th>Расстояние</th>
        </tr>
        {sortedPageData
          ? sortedPageData.map((entry) => {
              return (
                <tr key={entry.id}>
                  <td>{entry.date}</td>
                  <td>{entry.name}</td>
                  <td>{entry.count}</td>
                  <td>{entry.distance}</td>
                </tr>
              );
            })
          : pageData
          ? pageData.map((entry) => {
              return (
                <tr key={entry.id}>
                  <td>{entry.date}</td>
                  <td>{entry.name}</td>
                  <td>{entry.count}</td>
                  <td>{entry.distance}</td>
                </tr>
              );
            })
          : () => {
              return <div>No data</div>;
            }}
      </S.Table>
    </S.Container>
  );
}

export default Table;
