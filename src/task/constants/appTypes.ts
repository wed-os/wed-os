/** @public */
export enum AppType {
    OS = 'os',
    Core = 'core',
    User = 'user'
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
        value: AppType.Core,
        label: 'Lõi'
    },
    {
        value: AppType.User,
        label: 'Người dùng'
    }
]
