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

interface Props {
  banks: BankDto[];
  filterDataBasisOnSelectedCategory: (
    value: string,
    category: Category | undefined
  ) => void;
  setCity: React.Dispatch<React.SetStateAction<City>>;
}

export default function BankList({
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
      <div className="pagination-container">pages</div>
    </StyledBankList>
  );
}
