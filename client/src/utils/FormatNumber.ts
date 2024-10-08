export function separateThousands(num : number | string) {
  const numStr = num.toString().split("").reverse().join("");
  const formattedStr = numStr.replace(/(\d{3})(?=\d)/g, "$1,");
  return formattedStr.split("").reverse().join("");
}
