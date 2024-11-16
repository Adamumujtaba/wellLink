export const formatDateTime = (dateTimeString: string | number | Date) => {
  if (dateTimeString === "NILL") {
    return "NILL";
  }

  const date = new Date(dateTimeString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  //   const second = String(date.getSeconds()).padStart(2, "0");
  //   const millisecond = String(date.getMilliseconds()).padStart(3, "0");

  const formattedDateTime = `${hour}:${minute} ${year}/${month}/${day}`;

  return formattedDateTime;
};

export function getUserInitials(fullName: string): string {
  if (!fullName) return "";

  const names = fullName.trim().split(" ");
  const initials = names.map((name) => name[0].toUpperCase()).join("");

  return initials;
}
const exceptions: string[] = ["and", "in", "of"];
export const capitalizeFirstLetterOFEachWord = (input: string): string => {
  return input
    .split(" ")
    .map((word) => {
      const lowerCasedWord = word.toLowerCase();
      return exceptions.includes(lowerCasedWord)
        ? lowerCasedWord
        : lowerCasedWord.charAt(0).toUpperCase() + lowerCasedWord.slice(1);
    })
    .join(" ");
};

export const thousandFormatter = (num: number) => new Intl.NumberFormat().format(num);
