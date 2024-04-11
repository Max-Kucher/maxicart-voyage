import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import SearchApartmentsFormData from "@/types/SearchApartmentsFormData";
import ApartmentsSearchParams from "@/types/ApartmentsSearchParams";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertDateToSearch = (date: Date): string => {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - (offset * 60 * 1000)).toISOString().split('T')[0];
}

export const convertSearchApartmentsFormDataToApartmentsSearchParams = (data: SearchApartmentsFormData): ApartmentsSearchParams =>
{
  const searchParams: ApartmentsSearchParams = {
    items_per_page: 15,
  };

  if (data.date.from) {
    searchParams.arrival_date = convertDateToSearch(data.date.from);
  }

  if (data.date.to) {
    searchParams.departure_date = convertDateToSearch(data.date.to);
  }

  if (data?.price?.from) {
    searchParams.min_price = data.price.from;
  }

  if (data?.price?.to) {
    searchParams.max_price = data.price.to;
  }

  // if (data.general.room) {
  //     searchParams.rooms = data.general.room;
  // }

  if (data.general.adult || data.general.child) {
    searchParams.guests = (data?.general?.adult ?? 0) + (data?.general?.child ?? 0);
  }

  return searchParams;
}
