export const paths = {
/** /src/{shared,system,core,bridge,task}/**\/*.{tsx,ts} */
codes: [
    "/src/core/script.tsx",
    "/src/core/types.ts",
    "/src/task/script.tsx",
    "/src/task/types.ts",
    "/src/shared/script.tsx",
    "/src/shared/types.ts",
    "/src/shared/funcs/upperFirst.ts",
    "/src/system/script.tsx",
    "/src/system/types.ts",
    "/src/bridge/script.tsx",
    "/src/bridge/types.ts"
],
/** /src/shared/**\/*.css */
sharedCss: [
    "/src/shared/style.css"
],
/** /src/system/**\/*.css */
systemCss: [
    "/src/system/style.css"
],
/** /src/core/**\/*.css */
coreCss: [
    "/src/core/style.css"
],
/** /src/bridge/**\/*.css */
bridgeCss: [
    "/src/bridge/style.css"
],
/** /src/task/**\/*.css */
taskCss: [
    "/src/task/style.css"
],
/** /C/apps/* */
apps: [],
/** /C/!(apps)/** */
excludedApps: [
    "/C/images",
    "/C/images/icons",
    "/C/images/icons/icon.png"
],
}