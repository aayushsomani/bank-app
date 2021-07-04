import React, { ReactElement, useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { getBanksByCity } from "../../api/BankApis";
import SideBar from "../../components/sideBar/SideBar";
import {
  BANK_CONTENTS,
  Category,
  City,
} from "../../constants/contents/BankContents";
import { ROUTES } from "../../constants/routes/Routes";
import { BankDto } from "../../models/Dto/BankDto";
import { debounce } from "../../utils/HelperFunctions";
import BankList from "../bankList/BankList";
import BankDetails from "../bankDetails/BankDetails";
import { StyledHomeScreen } from "./styles";
import FavoriteBanks from "../favouriteBanks/FavoriteBanks";
import LoaderHOC from "../../components/loader";

interface Props {
  setLoading: Function;
}

function HomeScreen({ setLoading }: Props): ReactElement {
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [city, setCity] = useState(City.MUMBAI);
  const [banks, setBanks] = useState<BankDto[]>([]);
  const [filteredBankList, setFilteredBankList] = useState<BankDto[]>([]);
  const [currentBankList, setCurrentBankList] = useState<BankDto[]>([]);

  // handler for changing page to selected one
  const handlePageClick = (e: { selected: any }) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };

  // filter bank list basis on category provided
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
        return bank[category].toLowerCase().indexOf(value.toLowerCase()) !== -1;
      })
    );
  };

  // return debounced function for filtering data basis on selected category and value provided
  const debouncedFilterDataBasisOnSelectedCategory = debounce(
    filterDataBasisOnSelectedCategory,
    500
  );

  // sets current bank list which is used to render in bank list component after slicing according to pre page count
  useEffect(() => {
    const slicedList = filteredBankList.slice(offset, offset + perPage);
    setCurrentBankList(slicedList);
    setPageCount(Math.ceil(filteredBankList.length / perPage));
  }, [filteredBankList, offset, perPage]);

  // api call to get bank details, invokes each time when value of city changes
  useEffect(() => {
    setLoading(true);
    getBanksByCity(city)
      .then((data) => {
        setBanks(data);
        setFilteredBankList(data);
        setLoading(false);
      })
      .catch((err) => {
        //log error here
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
              perPage={perPage}
              city={city}
              handlePageClick={handlePageClick}
              filterDataBasisOnSelectedCategory={
                debouncedFilterDataBasisOnSelectedCategory
              }
              pageCount={pageCount}
              setPerPage={setPerPage}
              setCity={setCity}
              banks={currentBankList}
            />
          </Route>
          <Route exact path={ROUTES.BANK_DETAILS}>
            <BankDetails banks={banks} />
          </Route>
          <Route exact path={ROUTES.FAVORITE_BANKS}>
            <FavoriteBanks banks={currentBankList} />
          </Route>
          <Route>
            <h1>{BANK_CONTENTS.PAGE_NOT_FOUND}</h1>
            <Link to={ROUTES.ALL_BANKS}>{BANK_CONTENTS.GO_TO_HOME_PAGE}</Link>
          </Route>
        </Switch>
      </div>
    </StyledHomeScreen>
  );
}

export default LoaderHOC(HomeScreen);
