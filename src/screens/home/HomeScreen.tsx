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
import ErrorBoundary from "../../components/error/ErrorBoundary";
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

  const handlePageClick = (e: { selected: any }) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };

  const filterDataBasisOnSelectedCategory = (
    value: string,
    category: Category | undefined
  ) => {
    console.log(value, category);
    if (!category || !value) {
      setFilteredBankList(banks);
      return;
    }
    setFilteredBankList(
      banks.filter((bank) => {
        // if (category)
        return bank[category].toLowerCase().includes(value.toLowerCase());
      })
    );
  };

  const debouncedFilterDataBasisOnSelectedCategory = debounce(
    filterDataBasisOnSelectedCategory,
    500
  );

  useEffect(() => {
    const slicedList = filteredBankList.slice(offset, offset + perPage);
    setCurrentBankList(slicedList);
    setPageCount(Math.ceil(filteredBankList.length / perPage));
  }, [filteredBankList, offset, perPage]);

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
            <ErrorBoundary>
              <BankList
                handlePageClick={handlePageClick}
                filterDataBasisOnSelectedCategory={
                  debouncedFilterDataBasisOnSelectedCategory
                }
                pageCount={pageCount}
                setPerPage={setPerPage}
                setCity={setCity}
                banks={currentBankList}
              />
            </ErrorBoundary>
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

export default LoaderHOC(HomeScreen, "Please wait we load the data");
