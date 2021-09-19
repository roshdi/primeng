export interface Translation {
    startsWith?: string;
    contains?: string;
    notContains?: string;
    endsWith?: string;
    equals?: string;
    notEquals?: string;
    noFilter?: string;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    is?: string;
    isNot?: string;
    before?: string;
    after?: string;
    dateIs?: string;
    dateIsNot?: string;
    dateBefore?: string;
    dateAfter?: string;
    clear?: string;
    apply?: string;
    matchAll?: string;
    matchAny?: string;
    addRule?: string;
    removeRule?: string;
    accept?: string;
    reject?: string;
    choose?: string;
    upload?: string;
    cancel?: string;

    dayNames?: string[];
    dayNames_jalali?: string[];
    dayNames_fa?: string[];
    dayNames_jalali_fa?: string[];

    dayNamesShort?: string[];
    dayNamesShort_jalali?: string[];
    dayNamesShort_fa?: string[];
    dayNamesShort_jalali_fa?: string[];

    dayNamesMin?: string[];
    dayNamesMin_jalali?: string[];
    dayNamesMin_fa?: string[];
    dayNamesMin_jalali_fa?: string[];

    monthNames?: string[];
    monthNames_jalali?: string[];
    monthNames_fa?: string[];
    monthNames_jalali_fa?: string[];

    monthNamesShort?: string[];
    monthNamesShort_jalali?: string[];
    monthNamesShort_fa?: string[];
    monthNamesShort_jalali_fa?: string[];

    dateFormat?: string;
    today?: string;
    today_jalali?: string;
    today_fa?: string;
    today_jalali_fa?: string;

    weekHeader?: string;
    weak?: string;
    medium?: string;
    strong?: string;
    passwordPrompt?: string;
    emptyMessage?: string;
    emptyFilterMessage?: string;
}
