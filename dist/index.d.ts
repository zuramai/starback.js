interface BaseConfig {
    type?: 'dot' | 'line';
    width?: number;
    height?: number;
    backgroundColor?: string | string[];
    quantity?: number;
    showFps?: boolean;
    starSize?: number | number[];
}
interface StarDotConfig extends BaseConfig {
    type?: 'dot';
    direction?: number;
    randomOpacity?: boolean | [number, number];
    speed?: number | number[];
    starColor?: String;
}
interface StarLineConfig extends BaseConfig {
    type: 'line';
    directionY?: number;
    directionX?: number;
    speed?: number;
    distanceX?: number;
    frequency?: number;
    slope?: {
        x?: number;
        y?: number;
    };
    starColor?: String | String[];
    spread?: number;
}
declare type StarbackConfig = StarDotConfig | StarLineConfig;
declare type AddCallback = (ctx: CanvasRenderingContext2D) => void;
interface StarbackInterface {
    config: StarbackConfig;
    stars: StarType;
    fps: number;
    generateStar(amount: string): void;
    addToFront(cb: AddCallback): void;
    addToBehind(cb: AddCallback): void;
}
interface StarType {
    config: StarbackConfig;
    draw: () => void;
    update: () => void;
    generate: (quantity: number) => void;
}

declare class Dot implements StarType {
    /**
     * Collection of stars
     * @param
     */
    stars: any[];
    type: 'dot';
    config: StarDotConfig;
    overflowSize: number;
    /** @type {HTMLCanvasElement} */
    canvas: any;
    /** @type {CanvasRenderingContext2D} */
    ctx: any;
    constructor(canvas: any, config: any);
    draw(): void;
    update(): void;
    generate(amount: any, location?: any): number;
    randomSize(): any;
    randomOpacity(): string | 1;
    randomSpeed(): any;
}

declare class Line implements StarType {
    /**
     * Collection of stars
     * @param
     */
    stars: any[];
    config: StarLineConfig;
    direction: number;
    /** @type {HTMLCanvasElement} */
    canvas: any;
    /** @type {CanvasRenderingContext2D} */
    ctx: any;
    constructor(canvas: any, config: any);
    draw(): void;
    update(): void;
    generate(): any[];
}

/**
 * Starback class wrapper
 * @class Starback
 */
declare class Starback implements StarbackInterface {
    static DefaultConfig: StarbackConfig;
    private ctx;
    config: StarbackConfig;
    stars: StarType;
    canvas: any;
    starTypes: {
        dot: typeof Dot;
        line: typeof Line;
    };
    fps: number;
    private repeat;
    private lastCalledTime;
    private lastGenerated;
    private frontCallbacks;
    private behindCallbacks;
    /**
     * Starback library
     * @param {HTMLElement|string} Canvas element or the selector
     * @param {Object} options
     */
    constructor(canvas: HTMLCanvasElement | string, config?: {});
    static create(canvas: HTMLCanvasElement | string, config?: StarbackConfig): Starback;
    /**
     * Merge Config
     * @param  {StarbackDefaultConfig|object} instanceConfig
     */
    private mergeConfig;
    /**
     * Initialize canvas before render
     */
    private init;
    /**
     * Set background for the whole canvas
     */
    private setBackground;
    /**
     * Draw the frame into the canvas
     */
    private draw;
    /**
     * Update everything in the canvas frame including stars
     */
    private update;
    /**
     * Add an object in front of the stars
     * @param {Function} cb Callback function
     */
    addToFront(cb: any): void;
    /**
     * Add an object behind the stars
     * @param {Function} cb Callback function
     */
    addToBehind(cb: any): void;
    /**
     * The total quantity of stars in canvas
     * @param {Number} amount The number of stars
     */
    generateStar(): void;
    /**
     * Draw the FPS in the canvas.
     */
    private drawFps;
    /**
     * Canvas render function
     * @param {DOMHighResTimeStamp} timestamp
     */
    private render;
}

export { Starback as default };
