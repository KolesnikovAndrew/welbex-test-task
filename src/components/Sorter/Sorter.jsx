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
      <label htmlFor="choose-column">Выберите колонку:</label>
      <select
        name="choose-column"
        id="choose-column"
        onChange={(e) => {
          setColumn(e.target.value);
        }}
      >
        <option value="name">Название</option>
        <option value="count">Количество</option>
        <option value="distance">Расстояние</option>
      </select>
      <label htmlFor="choose-conditions">Выберите условие:</label>
      {column === "name" ? (
        <select
          name="choose-conditions"
          id="choose-conditions"
          onChange={(e) => {
            setCondition(e.target.value);
          }}
        >
          <option value="=">Равно</option>
          <option value="LIKE">Содержит</option>
        </select>
      ) : (
        <select
          name="choose-conditions"
          id="choose-conditions"
          onChange={(e) => {
            setCondition(e.target.value);
          }}
        >
          <option value="=">Равно</option>
          <option value=">">Больше</option>
          <option value="<">Меньше</option>
        </select>
      )}

      <input
        id="filter-value"
        placeholder="Введите значения для фильтрации..."
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        type={column === "name" ? "text" : "number"}
      ></input>
      <button type="submit" onClick={sortTable}>
        Применить
      </button>

      <S.Paginator>
        <button onClick={goBack} disabled={pageNumber === 0 ? true : false}>
          Назад
        </button>
        <button
          onClick={goNext}
          disabled={pageNumber + 1 >= pagesCount ? true : false}
        >
          Вперёд
        </button>
      </S.Paginator>
    </S.Sorter>
  );
}

export default Sorter;
