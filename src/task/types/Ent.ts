export interface Ent {
    path: string
    name: string
    isDir: boolean
    isFile: boolean
    mtime: number
    size: number
    children?: Ent[]
}
