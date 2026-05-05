import { Button, Color, ControlGroup, sizes, TextInput, useOS, Variant } from 'wedos'

const variants: Variant[] = ['solid', 'outlined', 'minimal']
const colors: Color[] = ['default', 'primary', 'danger']

export function App() {
    const { x, maximized, perms } = useOS()

    return (
        <div className="h-full overflow-auto p-1 *:m-1">
            {sizes.map((size) => (
                <>
                    {variants.map((variant) => (
                        <>
                            {colors.map((color) => (
                                <Button color={color} variant={variant} size={size}>
                                    Button
                                </Button>
                            ))}
                        </>
                    ))}
                    <br />
                </>
            ))}
            <Button icon="star">Favorite</Button>
            <br />

            {sizes.map((size) => (
                <TextInput size={size} />
            ))}
            {sizes.map((size) => (
                <TextInput
                    size={size}
                    icon="user"
                    placeholder="Tên người dùng"
                    rightElement={
                        <Button color="danger" icon="trash">
                            Xóa
                        </Button>
                    }
                />
            ))}
            <br />

            {sizes.map((size) => (
                <ControlGroup size={size}>
                    <Button>A</Button>
                    <TextInput />
                    <Button color="primary">B</Button>
                    <Button>C</Button>
                </ControlGroup>
            ))}
            <br />

            <div>
                <div>Random: {Math.random()}</div>
                <div>x: {x}</div>
                <div>maximized: {String(maximized)}</div>
                <div>perms.taskPermsRead.resolved: {String(perms.taskPermsRead.resolved)}</div>
                <div>perms.taskInfoRead.session: {String(perms.taskInfoRead.session)}</div>
            </div>
        </div>
    )
}
