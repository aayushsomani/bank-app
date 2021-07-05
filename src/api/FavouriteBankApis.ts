import { BankDto } from '../models/Dto/BankDto';
import { FAVORITE_BANKS_KEY } from '../constants/contents/BankContents';
import { getItemFromLocalStorage, setItemInLocalStorage } from '../utils/HelperFunctions';

export function getFavoriteBanksFromLocal(): BankDto[] {
    let favoriteBanks: BankDto[] = getItemFromLocalStorage(FAVORITE_BANKS_KEY);
    if (!favoriteBanks)
        return []
    return favoriteBanks;
}

export function setFavoriteBankInLocal(bank: BankDto) {
    let favoriteBanks: BankDto[] = getFavoriteBanksFromLocal();
    favoriteBanks.push(bank);
    setItemInLocalStorage(FAVORITE_BANKS_KEY, favoriteBanks);
}

export function setFavoriteBanksInLocal(favoriteBanks: BankDto[]) {
    setItemInLocalStorage(FAVORITE_BANKS_KEY, favoriteBanks);
}
