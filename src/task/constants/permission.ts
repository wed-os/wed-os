import { OSProp } from '@task/constants/os'

export const permissionStates = ['granted', 'prompt', 'denied'] as const
export type PermissionState = (typeof permissionStates)[number]

export const permissionNames = [
    'taskInfoRead',
    'taskSizeRead',
    'taskPositionRead',
    'taskWinStateRead',
    'taskNoHeaderRead',
    'taskPermsRead',
    'taskPathsRead'
] as const
export type PermissionName = (typeof permissionNames)[number]

export interface Permission {
    name: PermissionName
    text: string
    defaultState: PermissionState
    syncProps: OSProp[]
}

export const permissions: Permission[] = [
    {
        name: 'taskInfoRead',
        text: 'Đọc thông tin cơ bản',
        defaultState: 'granted',
        syncProps: ['id', 'path', 'name', 'type', 'icon', 'title']
    },
    {
        name: 'taskSizeRead',
        text: 'Đọc kích thước cửa sổ',
        defaultState: 'granted',
        syncProps: ['width', 'height']
    },
    {
        name: 'taskPositionRead',
        text: 'Đọc vị trí cửa sổ',
        defaultState: 'granted',
        syncProps: ['x', 'y']
    },
    {
        name: 'taskWinStateRead',
        text: 'Đọc trạng thái cửa sổ',
        defaultState: 'granted',
        syncProps: ['maximized', 'minimized', 'fullscreen']
    },
    {
        name: 'taskNoHeaderRead',
        text: 'Đọc trạng thái ẩn thanh tiêu đề',
        defaultState: 'granted',
        syncProps: ['noHeader']
    },
    {
        name: 'taskPermsRead',
        text: 'Đọc trạng thái các quyền',
        defaultState: 'granted',
        syncProps: ['perms']
    },
    {
        name: 'taskPathsRead',
        text: 'Đọc tập tin/thư mục',
        defaultState: 'prompt',
        syncProps: []
    }
] as const

export const permissionsMap = Object.fromEntries(
    permissions.map((perm) => {
        return [perm.name, perm]
    })
) as Record<PermissionName, Permission>
