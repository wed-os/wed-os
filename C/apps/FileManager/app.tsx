import { Button, ControlGroup, TextInput } from 'wedos'

export function App() {
    return (
        <div className="flex h-full flex-col gap-2 p-2">
            <div className="flex gap-2">
                <ControlGroup>
                    <Button icon="arrow-left" />
                    <Button icon="arrow-right" />
                    <Button icon="arrow-up" />
                </ControlGroup>

                <ControlGroup fill>
                    <TextInput />
                    <Button icon="rotate-right" />
                    <Button icon="arrow-turn-down-left" />
                </ControlGroup>

                <ControlGroup>
                    <TextInput />
                    <Button icon="search" />
                </ControlGroup>
            </div>
        </div>
    )
}
