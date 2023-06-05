const StringIsNumber = (value: any) => isNaN(Number(value));

export function EnumToArray(enumMember: any) {
  return Object.keys(enumMember)
    .filter(StringIsNumber)
    .map((key) => enumMember[key]);
}

export function calculateDiscountedPrice(
  rate: number,
  originalPrice: number
): number {
  return (1 - (rate / 100)) * originalPrice;
}

export function padLeadingZeros(num: number, size: number) {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

export function addCountryCodeToPhoneNumber(phoneNumber: string, countryCode = 256): string {
  return countryCode + phoneNumber.slice(1);
}

export function toSnakeCase(str: string): string {
  return str.replace(/ /g, "_").toLowerCase();
}

export function toSimpleDateString(date: Date) {
  return (new Date(date)).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).split("/").join("-");
}
