export class Script {
  constructor(
    private src: string,
    private integrity = '',
    private crossorigin = '',
  ) {}

  getTag(): string {
    let content = `src="${this.src}"`;
    if (!!this.integrity) content += ` integrity="${this.integrity}"`;
    if (!!this.crossorigin) content += ` crossorigin="${this.crossorigin}"`;
    return `<script rel="stylesheet" ${content}></script>`;
  }
}
