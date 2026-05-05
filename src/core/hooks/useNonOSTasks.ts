import { Task } from '@task/constants/task'
import { getNonOSTasks } from '@task/funcs/getNonOSTasks'
import { useOS } from '@task/hooks/useOS'
import { useMemo } from 'react'

export function useNonOSTasks(): Task[] {
    const { tasks } = useOS()

    return useMemo(getNonOSTasks, [tasks])
}
