import { BankDto } from './../models/Dto/BankDto';
import { City } from '../constants/contents/BankContents';
import { ENDPOINTS } from '../constants/endpoints/EndPoints';
import { axiosInstance } from './../utils/ApiUtility';

export async function getBanksByCity(city: City): Promise<BankDto[]> {
    let result = await axiosInstance.get(ENDPOINTS.BANK.GET_ALL, {
        params: {
            city: city
        }
    })
    return result.data;
}

