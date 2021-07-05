
export enum City {
    MUMBAI = "MUMBAI",
    LUCKNOW = "LUCKNOW",
    BANGALORE = "BANGALORE",
}

export enum Category {
    IFSC = "ifsc",
    BRANCH = "branch",
    CITY = "city",
    DISTRICT = "district",
    STATE = "state",
    BANK_NAME = "bank_name",
}

export const BANK_CONTENTS = {
    ALL_BANK: "ALL BANKS",
    FAVORITE_BANKS: "FAVORITE BANKS",
    NOT_FOUND: "NOT FOUND",
    PAGE_NOT_FOUND: "PAGE NOT FOUND",
    GO_TO_HOME_PAGE: "GO TO HOME PAGE",
    CITY_OPTIONS: [
        { text: City.MUMBAI, value: City.MUMBAI },
        { text: City.LUCKNOW, value: City.LUCKNOW },
        { text: City.BANGALORE, value: City.BANGALORE },
    ],
    CATEGORY_OPTIONS: [
        { text: "SELECT CATEGORY", value: "" },
        { text: "BANK", value: Category.BANK_NAME },
        { text: "IFSC", value: Category.IFSC, },
        { text: "BRANCH", value: Category.BRANCH, },
    ],
    PAGE_COUNTS: [
        { text: "10", value: "10" },
        { text: "20", value: "20" },
        { text: "30", value: "30", },
    ],
    SEARCH_PLACEHOLDER: "Search",
    PAGE_COUNT_TEXT: "Rows Per Page:",
    TABLE_HEADING: {
        BANK: "BANK",
        BANK_ID: "BANK ID",
        CITY: "CITY",
        STATE: "STATE",
        DISTRICT: "DISTRICT",
        ADDRESS: "ADDRESS",
        IFSC: "IFSC",
        BRANCH: "BRANCH",
        VIEW_MORE: "VIEW MORE",
        FAVORITE: "FAVORITE",
    },
    VIEW_MORE: "VIEW MORE",
    MARK_AS_FAV: "MARK AS FAV",
    UN_MARK_AS_FAV: "UN MARK",
    MARKED_AS_FAV: "MARKED AS FAV",
}

export const FAVORITE_BANKS_KEY = "favorite_banks"
