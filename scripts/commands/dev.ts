import { startDevServer } from '@scripts/funcs/startDevServer'
import { watchCodeFiles } from '@scripts/funcs/watchCodeFiles'
import { watchPathsFile } from '@scripts/funcs/watchPathsFile'

watchPathsFile()
watchCodeFiles()
startDevServer()
