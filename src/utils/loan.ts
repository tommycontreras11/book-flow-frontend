import { ILoanManagementFilter } from "@/providers/http/loans-management/interface";

const appendSignFilterString = (filter?: string) => {
  return filter !== null && filter !== undefined ? "&" : "?";
};

export const appendFilterString = (filters?: ILoanManagementFilter) => {
  let filtersString: string = "";

  filters?.bibliography_type &&
    (filtersString += `?bibliography_type=${filters.bibliography_type}`);

  filters?.language &&
    (filtersString += `${appendSignFilterString(
      filters?.bibliography_type
    )}language=${filters.language}`);

  filters?.date_loan &&
    (filtersString += `${appendSignFilterString(filters?.language)}date_loan=${
      filters.date_loan
    }`);

  filters?.date_return &&
    (filtersString += `${appendSignFilterString(
      filters?.date_loan?.toISOString()
    )}date_return=${filters.date_return}`);

  return filtersString;
};
