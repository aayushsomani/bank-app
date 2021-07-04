import React, { ReactElement } from "react";
import { BANK_CONTENTS } from "../../constants/contents/BankContents";
import { BankDto } from "../../models/Dto/BankDto";
import { StyledFavoriteBanks } from "./styles";

interface Props {
  banks: BankDto[];
}

export default function FavoriteBanks({ banks }: Props): ReactElement {
  return (
    <StyledFavoriteBanks>
      <div className="bank-query-container">
        <div>{BANK_CONTENTS.FAVORITE_BANKS}</div>
        <div></div>
      </div>
      <div className="bank-list-container">
        <table className="bank-table-container">
          <tr>
            <th>BANK</th>
            <th>IFSC</th>
            <th>BRANCH</th>
            <th>DISTRICT</th>
          </tr>
          {banks.map((bank) => (
            <tr>
              <td>{bank.bank_name}</td>
              <td>{bank.ifsc}</td>
              <td>{bank.branch}</td>
              <td>{bank.district}</td>
            </tr>
          ))}
        </table>
      </div>
    </StyledFavoriteBanks>
  );
}
