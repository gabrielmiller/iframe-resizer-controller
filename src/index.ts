import { InitializeFunction, InitializeResult, Settings } from "@open-iframe-resizer/core";

export default class Controller {
  private initialize_iframe_resizer!: InitializeFunction;
  private open_iframe_resizer_args!: Settings;
  private open_iframe_resizer_selector!: string;
  private resizer_listener!: InitializeResult;
  private _window!: Window;

  constructor(_window: Window, _initialize: InitializeFunction, open_iframe_resizer_args: Settings, open_iframe_resizer_selector: string) {
    this.open_iframe_resizer_args = open_iframe_resizer_args;
    this.open_iframe_resizer_selector = open_iframe_resizer_selector;
    this.initialize_iframe_resizer = _initialize;
    this._window = _window;

    this.initialize();
    this.start();
  }

  handler = (event: MessageEvent<any>) => {
    if (event.data !== "reset-iframe-resizer") {
      return;
    }

    this.reset();
  }

  initialize = () => {
    this.initialize_iframe_resizer(
      this.open_iframe_resizer_args,
      this.open_iframe_resizer_selector
    ).then(([result]) => {
      this.resizer_listener = result;
    });
  }

  reset = () => {
    if (this.resizer_listener == null) {
      return;
    }

    this.resizer_listener.unsubscribe();
    this.initialize();
  }

  start = () => {
    this._window.addEventListener("message", this.handler);
  }

  stop = () => {
    if (this.resizer_listener != null) {
      this.resizer_listener.unsubscribe();
    }

    this._window.removeEventListener("message", this.handler);
  }
}