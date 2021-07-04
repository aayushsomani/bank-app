import { BankDto } from './../models/Dto/BankDto';
import { City } from '../constants/contents/BankContents';
import { ENDPOINTS } from '../constants/endpoints/EndPoints';
import { axiosInstance } from './../utils/ApiUtility';
import { getItemFromLocalStorageWithExpiry, setItemInLocalStorageWithExpiry } from '../utils/HelperFunctions';

export async function getBanksByCity(city: City): Promise<BankDto[]> {
    let result = getItemFromLocalStorageWithExpiry(`${ENDPOINTS.BANK.GET_ALL}?city=${city}`);
    if (result)
        return result;
    result = await axiosInstance.get(ENDPOINTS.BANK.GET_ALL, {
        params: {
            city: city
        }
    })
    setItemInLocalStorageWithExpiry(`${ENDPOINTS.BANK.GET_ALL}?city=${city}`, result.data);
    return result.data;
}

