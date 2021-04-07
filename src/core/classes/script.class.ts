export interface IScript {
  readonly src: string;
  readonly integrity: string;
  readonly crossorigin: string;
}

export class Script implements IScript {
  constructor(
    readonly src: string,
    readonly integrity = '',
    readonly crossorigin = '',
  ) {}

  getTag(): string {
    let content = `src="${this.src}"`;
    if (!!this.integrity) content += ` integrity="${this.integrity}"`;
    if (!!this.crossorigin) content += ` crossorigin="${this.crossorigin}"`;
    return `<script rel="stylesheet" ${content}></script>`;
  }
}
