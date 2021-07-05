import React, { ReactElement, useEffect, useState } from "react";
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
import SelectBox from "../../components/selectbox/SelectBox";
import {
  getFavoriteBanksFromLocal,
  setFavoriteBankInLocal,
} from "../../api/FavouriteBankApis";

interface Props {
  addIntoFavorite: (bank: BankDto) => void;
  favoriteBanks: BankDto[];
  perPage: number;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  city: City;
  handlePageClick: any;
  pageCount: number;
  banks: BankDto[];
  filterDataBasisOnSelectedCategory: (
    value: string,
    category: Category | undefined
  ) => void;
  setCity: React.Dispatch<React.SetStateAction<City>>;
}

// renders list of banks
function BankList({
  addIntoFavorite,
  favoriteBanks,
  perPage,
  setPerPage,
  city,
  handlePageClick,
  pageCount,
  banks,
  setCity,
  filterDataBasisOnSelectedCategory,
}: Props): ReactElement {
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [filteredBanks, setFilteredBanks] = useState<BankDto[]>([]);

  // handler for search input change
  const handleInputChange = (e: { target: { value: string } }) => {
    filterDataBasisOnSelectedCategory(e.target.value, selectedCategory);
  };

  //handler for category change
  const handleCategoryChange = (e: any) => {
    setSelectedCategory(e.target.value as Category);
  };

  //handler for city change
  const handleCityChange = (e: any) => {
    setCity(e.target.value as City);
  };

  //handler for page change
  const handlePerPageChange = (e: any) => {
    setPerPage(parseInt(e.target.value));
  };

  useEffect(() => {
    let favoriteBanksMap = new Set(
      favoriteBanks.map((favBank) => favBank.ifsc)
    );
    let vFilteredBanks = banks.map((vBank) => {
      if (favoriteBanksMap.has(vBank.ifsc)) vBank.isFavorite = true;
      else vBank.isFavorite = false;
      return vBank;
    });
    setFilteredBanks(vFilteredBanks);
  }, [favoriteBanks, banks]);

  return (
    <StyledBankList>
      <div className="bank-query-container">
        <div>{BANK_CONTENTS.ALL_BANK}</div>
        <div>
          <SelectBox
            options={BANK_CONTENTS.CITY_OPTIONS}
            value={city}
            onChange={handleCityChange}
          />
          <SelectBox
            options={BANK_CONTENTS.CATEGORY_OPTIONS}
            value={selectedCategory}
            onChange={handleCategoryChange}
          />
          <input
            placeholder={BANK_CONTENTS.SEARCH_PLACEHOLDER}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="bank-list-container">
        {banks.length !== 0 ? (
          <table className="bank-table-container">
            <tbody>
              <tr>
                <th>{BANK_CONTENTS.TABLE_HEADING.BANK}</th>
                <th>{BANK_CONTENTS.TABLE_HEADING.IFSC}</th>
                <th>{BANK_CONTENTS.TABLE_HEADING.BRANCH}</th>
                <th>{BANK_CONTENTS.TABLE_HEADING.DISTRICT}</th>
                <th>{BANK_CONTENTS.TABLE_HEADING.VIEW_MORE}</th>
                <th>{BANK_CONTENTS.TABLE_HEADING.FAVORITE}</th>
              </tr>
              {filteredBanks.map((bank, k) => {
                return (
                  <tr key={k}>
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
                        {BANK_CONTENTS.VIEW_MORE}
                      </Link>
                    </td>
                    <td>
                      <button
                        disabled={bank.isFavorite}
                        onClick={() => {
                          addIntoFavorite(bank);
                        }}
                      >
                        {bank.isFavorite
                          ? BANK_CONTENTS.MARKED_AS_FAV
                          : BANK_CONTENTS.MARK_AS_FAV}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h1>{BANK_CONTENTS.NOT_FOUND}</h1>
        )}
      </div>
      <div className="pagination-container">
        <div className="page-count-container">
          <span>{BANK_CONTENTS.PAGE_COUNT_TEXT}</span>
          <SelectBox
            options={BANK_CONTENTS.PAGE_COUNTS}
            onChange={handlePerPageChange}
          />
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
