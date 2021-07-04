import React, { ReactElement, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { getBanksByCity } from "../../api/BankApis";
import SideBar from "../../components/sideBar/SideBar";
import { Category, City } from "../../constants/contents/BankContents";
import { ROUTES } from "../../constants/routes/Routes";
import { BankDto } from "../../models/Dto/BankDto";
import { debounce } from "../../utils/HelperFunctions";
import BankList from "../bankList/BankList";
import BankDetails from "../bankDetails/BankDetails";
import { StyledHomeScreen } from "./styles";
import FavoriteBanks from "../favouriteBanks/FavoriteBanks";

interface Props {}

export default function HomeScreen({}: Props): ReactElement {
  const [city, setCity] = useState(City.MUMBAI);
  const [banks, setBanks] = useState<BankDto[]>([]);
  const [filteredBankList, setFilteredBankList] = useState<BankDto[]>([]);

  const filterDataBasisOnSelectedCategory = (
    value: string,
    category: Category | undefined
  ) => {
    if (!category || !value) {
      setFilteredBankList(banks);
      return;
    }
    setFilteredBankList(
      banks.filter((bank) => {
        if (category) return bank[category].includes(value);
      })
    );
  };

  const debouncedFilterDataBasisOnSelectedCategory = debounce(
    filterDataBasisOnSelectedCategory,
    500
  );

  useEffect(() => {
    getBanksByCity(city)
      .then((data) => {
        setBanks(data);
        setFilteredBankList(data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, [city]);

  return (
    <StyledHomeScreen>
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="bank-details-container">
        <Switch>
          <Route exact path={ROUTES.ALL_BANKS}>
            <BankList
              filterDataBasisOnSelectedCategory={
                debouncedFilterDataBasisOnSelectedCategory
              }
              setCity={setCity}
              banks={filteredBankList}
            />
          </Route>
          <Route exact path={ROUTES.BANK_DETAILS}>
            <BankDetails banks={banks} />
          </Route>
          <Route exact path={ROUTES.FAVORITE_BANKS}>
            <FavoriteBanks banks={filteredBankList} />
          </Route>
          <Route path={"/"}>
            <h1>NOT FOUND</h1>
          </Route>
        </Switch>
      </div>
    </StyledHomeScreen>
  );
}
