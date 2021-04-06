export interface ILink {
  readonly href: string;
  readonly integrity: string;
  readonly crossorigin: string;
}

export class Link implements ILink {
  constructor(
    readonly href: string,
    readonly integrity = '',
    readonly crossorigin = '',
  ) {}

  getTag(): string {
    let content = `href="${this.href}"`;
    if (!!this.integrity) content += ` integrity="${this.integrity}"`;
    if (!!this.crossorigin) content += ` crossorigin="${this.crossorigin}"`;
    return `<link rel="stylesheet" ${content}>`;
  }
}
