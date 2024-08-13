export function generateRandomKey(name: string): string {
  console.log("Generating random key for", name);
  const randomDigits = Math.floor(100 + Math.random() * 900); // Generates a random 3-digit number
  const formattedName = name.replace(/\s+/g, "-").toLowerCase(); // Formats the name
  return `${formattedName}-${randomDigits}`;
}
