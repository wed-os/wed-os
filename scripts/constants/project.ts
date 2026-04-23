import { Project } from 'ts-morph'

export const project = new Project({
    tsConfigFilePath: 'src/tsconfig.json',
    skipAddingFilesFromTsConfig: true
})
