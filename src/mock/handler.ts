import {Server} from "miragejs";

export class Handler {
  private constructor(
    private readonly server: Server
  ) { }

  public static initialize() {
    return new Handler(new Server());
  }

  public use(fn: (server: Server<{}>) => unknown) {
    return fn(this.server);
  }
}
