import { useRef, useState } from 'react'
import './App.css'
import JSONTreee from './components/JsonTree'
import { ActiionButtons } from './types/ActionButtons'
import NavBar from './components/Navbar'
import { DummyJson } from './constants/DummyJson'
import { ActionButtonProps } from './interfaces/actionButtonProps'

function App() {
    const [value, setValue] = useState<string>()
    const inputRef = useRef<HTMLTextAreaElement>(null)

    const buttonsData: ActiionButtons[] = [
        {
            label: 'Clear',
            onClick: () => {
                if (inputRef.current?.value) {
                    setValue('')
                    inputRef.current.value = ''
                }
            },
        },
        {
            label: 'Beautify',
            onClick: () => Beautify(),
        },
        {
            label: 'Remove Formatting',
            onClick: () => removeFormatting(),
        },
        {
            label: 'Dummy JSON',
            onClick: () => AddDummyJson(),
        },
        {
            label: 'JSON Viewer',
            onClick: () => handleOnClick(),
        },
    ]

    /**
     * Method to set data for the json viewer
     */
    const handleOnClick = () => {
        const inputJsonValue: string = inputRef.current!.value
        setValue(JSON.parse(inputJsonValue))
    }

    /**
     * Method to remove all formatting from input json string
     */
    const removeFormatting = () => {
        const inputJsonValue: string = inputRef.current!.value
        inputRef.current!.value = JSON.stringify(JSON.parse(inputJsonValue))
    }

    /**
     * Method to format the json data
     */
    const Beautify = () => {
        const inputJsonValue: string = inputRef.current!.value
        inputRef.current!.value = JSON.stringify(
            JSON.parse(inputJsonValue),
            null,
            2
        )
    }

    /**
     * Method to return dummy json data
     */
    const AddDummyJson = () => {
        inputRef.current!.value = JSON.stringify(DummyJson, null, 2)
    }

    /**
     * Component to generate all the action buttons for json processing
     * @returns
     */
    const Actions: React.FC<ActionButtonProps> = ({ actionButtons }) => {
        return (
            <div className="flex gap-2 justify-center items-center">
                {actionButtons?.map((button, index) => (
                    <button
                        key={index}
                        className="mt-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        onClick={button.onClick}
                    >
                        {button.label}
                    </button>
                ))}
            </div>
        )
    }

    return (
        <>
            <NavBar />
            <div className="flex justify-around mb-2">
                <Actions actionButtons={buttonsData} />
            </div>
            <div className="main-wrapper">
                <div className="left">
                    <textarea
                        id="message"
                        ref={inputRef}
                        autoFocus
                        className="outline-none resize-none w-full h-full block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg "
                        placeholder="Enter your JSON here..."
                    ></textarea>
                </div>
                <div className="right ">
                    <Actions actionButtons={null} />
                    <div
                        style={{
                            backgroundColor: '#282C34',
                        }}
                        className="outline-none resize-none w-full h-full block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg "
                    >
                        <JSONTreee data={value ?? ''} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
