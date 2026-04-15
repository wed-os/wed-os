export enum AppType {
    OS = 'os',
    System = 'system',
    User = 'user'
}

export interface AppTypeItem {
    value: AppType
    label: string
}

export const appTypeItems: AppTypeItem[] = [
    {
        value: AppType.OS,
        label: 'Hệ điều hành'
    },
    {
        value: AppType.System,
        label: 'Hệ thống'
    },
    {
        value: AppType.User,
        label: 'Người dùng'
    }
]
