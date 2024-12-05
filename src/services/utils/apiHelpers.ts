export function extractPageNumber(url: string): number | null {
  try {
    const pageValue = new URL(url).searchParams.get("page");
    return pageValue ? parseInt(pageValue) : null;
  } catch {
    return null;
  }
}
