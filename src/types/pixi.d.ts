declare namespace PIXI {
  interface Application {
    renderer: any;
    screen: { width: number; height: number };
    stage: { addChild: (child: any) => void; removeChild: (child: any) => void };
  }
  
  class Application {
    constructor(options: { view: HTMLCanvasElement; autoStart: boolean; backgroundAlpha: number });
  }

  class Ticker {
    static shared: { deltaTime: number };
  }
} 