export interface BaseConfig {
    type?: 'dot' | 'line'
    width?: number
    height?: number
    backgroundColor?: string | string[]
    quantity?: number
    showFps?: boolean
    starSize?: number | number[]
}

export interface StarDotConfig extends BaseConfig {
    type?: 'dot'

    direction?: number
    randomOpacity?: boolean | [number,number]
    speed?: number | number[] 
    starColor?: String
}

export interface StarLineConfig extends BaseConfig {
    type: 'line'
    directionY?: number
    directionX?: number
    speed?: number 
    distanceX?: number
    frequency?: number
    slope?: {
        x?: number
        y?: number
    }
    starColor?: String|String[]
    spread?: number
}

export type StarbackConfig = StarDotConfig | StarLineConfig

type AddCallback = (ctx: CanvasRenderingContext2D) => void

export interface StarbackInterface {
    config: StarbackConfig
    stars: StarType
    fps: number

    generateStar(amount: string): void
    addToFront(cb: AddCallback): void
    addToBehind(cb: AddCallback): void
}


export interface StarType {
    config: StarbackConfig
    draw: () => void
    update: () => void
    generate: (quantity: number) => void
}