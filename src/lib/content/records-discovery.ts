import type { RecordListItem } from "./graph";

export type RecordSort = "newest" | "oldest";
export type RecordFilterState = {
  focus?: string[];
  format?: string;
  tag?: string;
};
export type RecordDiscoveryItem = Pick<
  RecordListItem,
  "id" | "publishedAt" | "tags" | "formatTag"
>;

export function filterRecordItems<RecordItem extends RecordDiscoveryItem>(
  records: RecordItem[],
  filters: RecordFilterState,
) {
  const focus = filters.focus ?? [];
  const format = filters.format ?? "";
  const tag = filters.tag ?? "";

  return records.filter((record) => {
    const matchesFocus =
      focus.length === 0 || focus.some((item) => record.tags.includes(item));
    const matchesFormat = !format || record.tags.includes(format);
    const matchesTag = !tag || record.tags.includes(tag);
    return matchesFocus && matchesFormat && matchesTag;
  });
}

export function sortRecordItems<RecordItem extends RecordDiscoveryItem>(
  records: RecordItem[],
  sort: RecordSort,
) {
  return [...records].sort((a, b) => {
    const aTime = a.publishedAt.getTime();
    const bTime = b.publishedAt.getTime();
    return sort === "oldest" ? aTime - bTime : bTime - aTime;
  });
}
