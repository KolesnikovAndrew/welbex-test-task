import React, { useState } from "react";
import styled from "styled-components";

const S = {};
S.Sorter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #248899;
  color: white;
  padding: 50px;
  border-radius: 20px;

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;
S.Paginator = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  top: 65vh;
  left: 50vw;
  padding: 50px;
`;

function Sorter({
  setPageData,
  setSortedData,
  welbexAPI,
  setSortedPageData,
  setIsSorted,
  isSorted,
  itemsOnPage,
  pagesCount,
  setTotalItems,
}) {
  const [column, setColumn] = useState("name");
  const [condition, setCondition] = useState("=");
  const [inputValue, setInputValue] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  //Get sorted data from server
  const sortTable = () => {
    welbexAPI
      .getSorted(column, condition, inputValue)
      .then((res) => {
        setIsSorted(true);
        setSortedData(res.data);
        setTotalItems(res.data.length);
      })
      .catch((err) => {
        setIsSorted(false);
        return err;
      });
    welbexAPI
      .getSortedByPage(column, condition, inputValue, "0", itemsOnPage)
      .then((res) => {
        setIsSorted(true);
        setSortedPageData(res.data);
      })
      .catch((err) => {
        setIsSorted(false);
        return err;
      });
  };
  //Pagination
  const goNext = () => {
    isSorted
      ? welbexAPI
          .getSortedByPage(
            column,
            condition,
            inputValue,
            pageNumber + 1,
            itemsOnPage
          )
          .then((res) => {
            setSortedPageData(res.data);
          })
          .catch((error) => {
            return error;
          })
      : welbexAPI
          .getByPage(pageNumber + 1, itemsOnPage)
          .then((res) => {
            setPageData(res);
          })
          .catch((error) => {
            return error;
          });
    setPageNumber(pageNumber + 1);
  };

  const goBack = () => {
    isSorted
      ? welbexAPI
          .getSortedByPage(
            column,
            condition,
            inputValue,
            pageNumber - 1,
            itemsOnPage
          )
          .then((res) => {
            setSortedPageData(res.data);
          })
          .catch((error) => {
            return error;
          })
      : welbexAPI
          .getByPage(pageNumber - 1, itemsOnPage)
          .then((res) => {
            setPageData(res);
          })
          .catch((error) => {
            return error;
          });
    setPageNumber(pageNumber - 1);
  };

  return (
    <S.Sorter>
      <label htmlFor="choose-column">???????????????? ??????????????:</label>
      <select
        name="choose-column"
        id="choose-column"
        onChange={(e) => {
          setColumn(e.target.value);
        }}
      >
        <option value="name">????????????????</option>
        <option value="count">????????????????????</option>
        <option value="distance">????????????????????</option>
      </select>
      <label htmlFor="choose-conditions">???????????????? ??????????????:</label>
      {column === "name" ? (
        <select
          name="choose-conditions"
          id="choose-conditions"
          onChange={(e) => {
            setCondition(e.target.value);
          }}
        >
          <option value="=">??????????</option>
          <option value="LIKE">????????????????</option>
        </select>
      ) : (
        <select
          name="choose-conditions"
          id="choose-conditions"
          onChange={(e) => {
            setCondition(e.target.value);
          }}
        >
          <option value="=">??????????</option>
          <option value=">">????????????</option>
          <option value="<">????????????</option>
        </select>
      )}

      <input
        id="filter-value"
        placeholder="?????????????? ???????????????? ?????? ????????????????????..."
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        type={column === "name" ? "text" : "number"}
      ></input>
      <button type="submit" onClick={sortTable}>
        ??????????????????
      </button>

      <S.Paginator>
        <button onClick={goBack} disabled={pageNumber === 0 ? true : false}>
          ??????????
        </button>
        <button
          onClick={goNext}
          disabled={pageNumber + 1 >= pagesCount ? true : false}
        >
          ????????????
        </button>
      </S.Paginator>
    </S.Sorter>
  );
}

export default Sorter;
