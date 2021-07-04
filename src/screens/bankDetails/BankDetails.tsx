import React, { ReactElement } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ROUTES } from "../../constants/routes/Routes";
import { BankDto } from "../../models/Dto/BankDto";
import { StyledFavoriteBanks } from "./styles";

interface Props {
  banks: BankDto[];
}

export default function FavoriteBanks({ banks }: Props): ReactElement {
  const { bankId } = useParams<{ bankId: string }>();
  const location = useLocation();
  let bank: BankDto | undefined = location.state as BankDto;
  if (!bank) {
    bank = banks.find((bank) => bank.ifsc === bankId);
  }

  if (!bank) {
    return (
      <StyledFavoriteBanks>
        <div className="heading-container">
          {"Something went wrong, Please try again"}
          <Link to={ROUTES.ALL_BANKS}>
            <span>{"click here"}</span>
          </Link>
        </div>
      </StyledFavoriteBanks>
    );
  }

  return (
    <StyledFavoriteBanks>
      <div className="heading-container">
        <Link to={ROUTES.ALL_BANKS}>
          <span>{"< back "}</span>
        </Link>
        {bank.bank_name}
      </div>
      <div className="bank-list-container">
        <table className="bank-table-container">
          <tr>
            <th>BANK</th>
            <th>IFSC</th>
            <th>BRANCH</th>
            <th>BANK ID</th>
          </tr>
          <tr>
            <td>{bank.bank_name}</td>
            <td>{bank.ifsc}</td>
            <td>{bank.branch}</td>
            <td>{bank.bank_id}</td>
          </tr>
          <tr>
            <th>CITY</th>
            <th>STATE</th>
            <th>DISTRICT</th>
            <th>ADDRESS</th>
          </tr>
          <tr>
            <td>{bank.city}</td>
            <td>{bank.state}</td>
            <td>{bank.district}</td>
            <td>{bank.address}</td>
          </tr>
        </table>
      </div>
    </StyledFavoriteBanks>
  );
}
