import { useRef, useState } from 'react'
import './App.css'
// import JSONTreee from './components/JsonTree'
import { ActiionButtons } from './types/ActionButtons'
import NavBar from './components/Navbar'
import { DummyJson } from './constants/DummyJson'
import { ActionButtonProps } from './interfaces/actionButtonProps'
import { editor } from 'monaco-editor'
import MonacoEditor from './components/Editor'
import {
    SlTrash,
    SlCloudDownload,
    SlMagicWand,
    SlBan,
    SlGhost,
    SlWrench,
    SlBookOpen,
} from 'react-icons/sl'
import ReactJson from 'react-json-view'

function App() {
    const [value, setValue] = useState<object>({ test: 'test' })
    const editorRef = useRef<editor.IStandaloneCodeEditor>()

    const buttonsData: ActiionButtons[] = [
        {
            isActive: true,
            label: (
                <span className="flex justify-between gap-2 items-center">
                    <SlTrash /> Clear
                </span>
            ),
            onClick: () => {
                editorRef.current?.setValue(
                    JSON.stringify(
                        JSON.parse(
                            '{"Instruction": "Enter your JSON here..."}'
                        ),
                        null,
                        2
                    )
                )
            },
        },
        {
            isActive: true,
            label: (
                <span className="flex justify-between gap-2 items-center">
                    <SlMagicWand /> Beautify
                </span>
            ),
            onClick: () => Beautify(),
        },
        {
            isActive: true,
            label: (
                <span className="flex justify-between gap-2 items-center">
                    <SlBan /> Remove Formatting
                </span>
            ),
            onClick: () => removeFormatting(),
        },
        {
            isActive: true,
            label: (
                <span className="flex justify-between gap-2 items-center">
                    <SlGhost /> Dummy JSON
                </span>
            ),
            onClick: () => AddDummyJson(),
        },
        {
            isActive: true,
            label: (
                <span className="flex justify-between gap-2 items-center">
                    <SlBookOpen /> JSON Viewer
                </span>
            ),
            onClick: () => handleOnClick(),
        },
        {
            isActive: true,
            label: (
                <span className="flex justify-between gap-2 items-center">
                    <SlCloudDownload /> Download
                </span>
            ),
            onClick: () => handleDownload(),
        },
        {
            isActive: false,
            label: (
                <span className="flex justify-between gap-2 items-center">
                    <SlWrench /> Generate JSON
                </span>
            ),
            onClick: () => handleDownload(),
        },
    ]

    /**
     * Method to download the content as a JSON file
     */
    const handleDownload = () => {
        const element = document.createElement('a')
        const file = new Blob(
            [
                JSON.stringify(
                    JSON.parse(editorRef?.current?.getValue() ?? ''),
                    null,
                    2
                ),
            ],
            { type: 'text/plain' }
        )
        element.href = URL.createObjectURL(file)
        element.download = 'formatted-content.json'
        document.body.appendChild(element)
        element.click()
    }

    /**
     * Method to set data for the json viewer
     */
    const handleOnClick = () => {
        setValue(JSON.parse(editorRef?.current?.getValue() ?? ''))
    }

    /**
     * Method to remove all formatting from input json string
     */
    const removeFormatting = () => {
        editorRef.current?.setValue(
            JSON.stringify(JSON.parse(editorRef.current.getValue()))
        )
    }

    /**
     * Method to format the json data
     */
    const Beautify = () => {
        editorRef.current?.setValue(
            JSON.stringify(JSON.parse(editorRef.current.getValue()), null, 2)
        )
    }

    /**
     * Method to return dummy json data
     */
    const AddDummyJson = () => {
        editorRef.current?.setValue(JSON.stringify(DummyJson, null, 2))
    }

    /**
     * Component to generate all the action buttons for json processing
     * @returns
     */
    const Actions: React.FC<ActionButtonProps> = ({ actionButtons }) => {
        return (
            <div className="flex gap-2 justify-center items-center absolute top-11">
                {actionButtons?.map(
                    (button, index) =>
                        button.isActive && (
                            <button
                                key={index}
                                className="mt-2 py-1 px-3 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                onClick={button.onClick}
                            >
                                {button.label}
                            </button>
                        )
                )}
            </div>
        )
    }

    const setEditorContext = (editor: editor.IStandaloneCodeEditor) => {
        editorRef.current = editor
    }

    return (
        <>
            <NavBar />
            <div className="flex justify-around mb-2">
                <Actions actionButtons={buttonsData} />
            </div>
            <div className="main-wrapper">
                <div className="left">
                    <div
                        style={{
                            backgroundColor: '#282C34',
                        }}
                        className="outline-none resize-none w-full h-full block"
                    >
                        <MonacoEditor
                            defaultValue={JSON.stringify(
                                JSON.parse(
                                    '{"Instruction": "Enter your JSON here..."}'
                                ),
                                null,
                                2
                            )}
                            setEditorContext={setEditorContext}
                        />
                    </div>
                </div>
                <div className="right ">
                    <div
                        style={{
                            backgroundColor: '#282C34',
                        }}
                        className="outline-none resize-none w-full h-full block"
                    >
                        {/* <JSONTreee data={value} /> */}
                        <ReactJson
                            style={{ overflow: 'scroll' }}
                            // onEdit={(e) => {
                            //     console.log(e)
                            // }}
                            // onDelete={(e) => {
                            //     console.log(e)
                            // }}
                            theme={'ashes'}
                            src={value}
                            displayDataTypes
                            displayObjectSize
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
