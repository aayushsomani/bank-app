import styled, { css } from "styled-components";

export const StyledBankList = styled.div`
  padding: 0 2vw;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  height: 100%;
  .bank-query-container {
    font-size: 20px;
    line-height: 25px;
    color: #505050;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10%;
  }
  .bank-list-container {
    padding: 1vh 0;
    overflow-y: scroll;
    height: 80%;
    .bank-table-container {
      border-collapse: collapse;
      width: 100%;
      td,
      th {
        border: 1px solid #ddd;
        padding: 8px;
      }
      tr:nth-child(even) {
        background-color: #f2f2f2;
      }
      tr:hover {
        background-color: #ddd;
      }
      th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #092a49;
        color: white;
      }
    }
  }
  .pagination-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 10%;
    .page-count-container {
      span {
        margin: 0 10px;
      }
      select {
        padding: 5px;
      }
    }
    .pagination {
      display: flex;
      list-style: none;
      outline: none;
    }
    .pagination > .active > a {
      background-color: #092a49;
      border-color: #092a49;
      color: #fff;
    }
    .pagination > li > a {
      border: 1px solid #092a49;
      padding: 5px 10px;
      outline: none;
      cursor: pointer;
    }
    .pagination > .active > a,
    .pagination > .active > span,
    .pagination > .active > a:hover,
    .pagination > .active > span:hover,
    .pagination > .active > a:focus,
    .pagination > .active > span:focus {
      background-color: #092a49;
      border-color: #092a49;
      outline: none;
    }
    .pagination > li > a,
    .pagination > li > span {
      color: #092a49;
    }
    .pagination > li:first-child > a,
    .pagination > li:first-child > span,
    .pagination > li:last-child > a,
    .pagination > li:last-child > span {
      border-radius: unset;
    }
  }
`;
