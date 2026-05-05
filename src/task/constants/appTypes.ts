/** @public */
export enum AppType {
    OS = 'os',
    Normal = 'normal'
}

/** @public */
export interface AppTypeItem {
    value: AppType
    label: string
}

/** @public */
export const appTypeItems: AppTypeItem[] = [
    {
        value: AppType.OS,
        label: 'Hệ điều hành'
    },
    {
        value: AppType.Normal,
        label: 'Thông thường'
    }
]
