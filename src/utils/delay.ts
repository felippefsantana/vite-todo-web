export async function delay(amount: number = 750) {
  return new Promise((resolve) => setTimeout(resolve, amount));
}
