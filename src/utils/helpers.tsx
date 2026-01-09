export function cn(...classes: (string | undefined | false)[]) {
  console.log(classes.filter(Boolean).join(" "));
  return classes.filter(Boolean).join(" ");
}
