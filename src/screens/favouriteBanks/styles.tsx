import styled, { css } from "styled-components";

export const StyledFavoriteBanks = styled.div`
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
    height: 90%;
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
    align-self: flex-end;
    height: 5%;
  }
`;
