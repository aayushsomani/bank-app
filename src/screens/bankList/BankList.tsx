import React, { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import {
  BANK_CONTENTS,
  Category,
  City,
} from "../../constants/contents/BankContents";
import { ROUTES } from "../../constants/routes/Routes";
import { BankDto } from "../../models/Dto/BankDto";
import { StyledBankList } from "./styles";
import ReactPaginate from "react-paginate";

interface Props {
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  handlePageClick: any;
  pageCount: number;
  banks: BankDto[];
  filterDataBasisOnSelectedCategory: (
    value: string,
    category: Category | undefined
  ) => void;
  setCity: React.Dispatch<React.SetStateAction<City>>;
}

function BankList({
  setPerPage,
  handlePageClick,
  pageCount,
  banks,
  setCity,
  filterDataBasisOnSelectedCategory,
}: Props): ReactElement {
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const handleInputChange = (e: { target: { value: string } }) => {
    filterDataBasisOnSelectedCategory(e.target.value, selectedCategory);
  };

  const handleCategoryChange = (e: any) => {
    setSelectedCategory(e.target.value as Category);
  };

  const handleCityChange = (e: any) => {
    setCity(e.target.value as City);
  };

  const handlePerPageChange = (e: any) => {
    setPerPage(parseInt(e.target.value));
  };

  return (
    <StyledBankList>
      <div className="bank-query-container">
        <div>{BANK_CONTENTS.ALL_BANK}</div>
        <div>
          <select onChange={handleCityChange}>
            <option value={City.MUMBAI}>{City.MUMBAI}</option>
            <option value={City.BANGALORE}>{City.BANGALORE}</option>
            <option value={City.LUCKNOW}>{City.LUCKNOW}</option>
          </select>
          <select onChange={handleCategoryChange} value={selectedCategory}>
            <option value={""}>{"SELECT "}</option>
            <option value={Category.BANK_NAME}>{Category.BANK_NAME}</option>
            <option value={Category.BRANCH}>{Category.BRANCH}</option>
            <option value={Category.IFSC}>{Category.IFSC}</option>
          </select>
          <input onChange={handleInputChange} />
        </div>
      </div>
      <div className="bank-list-container">
        <table className="bank-table-container">
          <tr>
            <th>BANK</th>
            <th>IFSC</th>
            <th>BRANCH</th>
            <th>DISTRICT</th>
            <th>VIEW MORE</th>
          </tr>
          {banks.map((bank) => (
            <tr>
              <td>{bank.bank_name}</td>
              <td>{bank.ifsc}</td>
              <td>{bank.branch}</td>
              <td>{bank.district}</td>
              <td>
                <Link
                  to={{
                    pathname: `${ROUTES.BANK_DETAIL}/${bank.ifsc}`,
                    state: bank,
                  }}
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className="pagination-container">
        <div className="page-count-container">
          <span>page count: </span>
          <select onChange={handlePerPageChange}>
            <option selected={true} value="10">
              10
            </option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </StyledBankList>
  );
}

export default React.memo(BankList);
