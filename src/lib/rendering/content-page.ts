export type ContentPageInput = {
  title: string;
  description: string;
  date?: Date;
  tags?: string[];
  body?: string;
};

export function hasMermaidBlock(body = "") {
  let activeFence: { marker: "`" | "~"; length: number } | undefined;

  for (const line of body.split(/\r?\n/)) {
    if (activeFence) {
      const closePattern = new RegExp(
        `^ {0,3}\\${activeFence.marker}{${activeFence.length},}[ \\t]*$`,
      );

      if (closePattern.test(line)) {
        activeFence = undefined;
      }

      continue;
    }

    const opener = /^(?: {0,3})(`{3,}|~{3,})[ \t]*(\S*)/.exec(line);

    if (!opener) {
      continue;
    }

    const marker = opener[1][0] as "`" | "~";
    const language = opener[2].toLowerCase();

    if (language === "mermaid") {
      return true;
    }

    activeFence = {
      marker,
      length: opener[1].length,
    };
  }

  return false;
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
