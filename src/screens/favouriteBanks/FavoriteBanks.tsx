import React, { ReactElement } from "react";
import { BANK_CONTENTS } from "../../constants/contents/BankContents";
import { BankDto } from "../../models/Dto/BankDto";
import { StyledFavoriteBanks } from "./styles";

interface Props {
  removeFromFavorite: (bank: BankDto) => void;
  favoriteBanks: BankDto[];
}

// renders list favorite bank from local storage
export default function FavoriteBanks({
  favoriteBanks,
  removeFromFavorite,
}: Props): ReactElement {
  return (
    <StyledFavoriteBanks>
      <div className="bank-query-container">
        <div>{BANK_CONTENTS.FAVORITE_BANKS}</div>
        <div></div>
      </div>
      <div className="bank-list-container">
        <table className="bank-table-container">
          <tbody>
            <tr>
              <th>{BANK_CONTENTS.TABLE_HEADING.BANK}</th>
              <th>{BANK_CONTENTS.TABLE_HEADING.IFSC}</th>
              <th>{BANK_CONTENTS.TABLE_HEADING.BRANCH}</th>
              <th>{BANK_CONTENTS.TABLE_HEADING.DISTRICT}</th>
              <th>{BANK_CONTENTS.TABLE_HEADING.FAVORITE}</th>
            </tr>
            {favoriteBanks.map((bank, k) => (
              <tr key={k}>
                <td>{bank.bank_name}</td>
                <td>{bank.ifsc}</td>
                <td>{bank.branch}</td>
                <td>{bank.district}</td>
                <td>
                  <button
                    onClick={() => {
                      removeFromFavorite(bank);
                    }}
                  >
                    {BANK_CONTENTS.UN_MARK_AS_FAV}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StyledFavoriteBanks>
  );
}
