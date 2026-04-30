export type ContentPageInput = {
  title: string;
  description: string;
  date?: Date;
  tags?: string[];
  body?: string;
};

export function hasMermaidBlock(body = "") {
  return /```mermaid(\s|\n)/.test(body);
}

export function getContentPageMeta(input: ContentPageInput) {
  return {
    title: input.title,
    description: input.description,
    date: input.date,
    tags: input.tags ?? [],
    hasMermaid: hasMermaidBlock(input.body),
  };
}
