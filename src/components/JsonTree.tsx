import React, { useState } from 'react'
import { SlTrash, SlPencil } from 'react-icons/sl'

interface JSONTreeProps {
    data: string
    rootNode?: string | null
}

const JSONTreee: React.FC<JSONTreeProps> = ({ data, rootNode }) => {
    const [collapsed, setCollapsed] = useState(false)
    const [cloneData, setCloneData] = useState(data)

    const toggleCollapse = () => {
        setCollapsed((prevCollapsed) => !prevCollapsed)
    }

    const renderNode = (key: string, value: string | number) => {
        if (typeof value === 'object' && value !== null) {
            return <JSONTreee key={key} data={value} rootNode={key} />
        } else {
            return (
                <div
                    className="flex gap-2 items-center"
                    key={key}
                    style={{
                        color: 'white',
                        textTransform: 'capitalize',
                    }}
                >
                    <span
                        style={{
                            color: '#DA5969',
                            textTransform: 'capitalize',
                        }}
                    >
                        {key}
                    </span>{' '}
                    :
                    <span
                        style={{
                            color: '#4EAC78',
                            textTransform: 'capitalize',
                        }}
                    >
                        {' '}
                        {value}
                    </span>
                    <div className=" mx-auto flex gap-3">
                        <SlPencil
                            className="text-sm cursor-pointer hover:text-red-500"
                            color="white"
                            onClick={() => {}}
                        />
                        <SlTrash
                            className="text-sm cursor-pointer hover:text-red-500"
                            color="white"
                            onClick={() => {
                                delete data[key]
                                const olddata = cloneData
                                console.log(olddata)
                                console.log(delete olddata[key])
                                setCloneData(olddata)
                            }}
                        />
                    </div>
                </div>
            )
        }
    }

    return (
        <div
            style={{
                marginTop: '3px',
                marginLeft: '20px',
                backgroundColor: '#282C34',
                fontFamily: 'monospace',
            }}
            className="h-full"
        >
            <span onClick={toggleCollapse} style={{ cursor: 'pointer' }}>
                {collapsed ? (
                    <>
                        <div className=" mx-auto flex gap-3">
                            <span
                                style={{
                                    color: '#DA5969',
                                    textTransform: 'capitalize',
                                }}
                            >
                                ➕{' '}
                                {/* {`${rootNode ? rootNode : 'Root'}: ${Object.keys(data).length} ${Array.isArray(data) ? 'items' : 'keys'}`} */}
                                {`${rootNode ? rootNode : 'Root'}`}
                            </span>
                            <SlPencil
                                className="text-sm cursor-pointer hover:text-red-500"
                                color="white"
                                onClick={() => {}}
                            />
                            <SlTrash
                                className="text-sm cursor-pointer hover:text-red-500"
                                color="white"
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    delete data[rootNode!]
                                    // setRenderNow((prev) => !prev)
                                }}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className=" mx-auto flex gap-3">
                            <span
                                style={{
                                    color: '#DA5969',
                                    textTransform: 'capitalize',
                                }}
                            >
                                ➖{' '}
                                {/* {`${rootNode ? rootNode : 'Root'}: ${Object.keys(data).length} ${Array.isArray(data) ? 'items' : 'keys'}`} */}
                                {`${rootNode ? rootNode : 'Root'}`}
                            </span>{' '}
                            <SlPencil
                                className="text-sm cursor-pointer hover:text-red-500"
                                color="white"
                                onClick={() => {}}
                            />
                            <SlTrash
                                className="text-sm cursor-pointer hover:text-red-500"
                                color="white"
                                onClick={(e) => {
                                    e.preventDefault()
                                    console.log(rootNode)
                                    delete data[rootNode as string]
                                    console.log(data)
                                    // setRenderNow((prev) => !prev)
                                }}
                            />
                        </div>
                    </>
                )}{' '}
            </span>
            {!collapsed && (
                <>
                    {Object.keys(cloneData as string).map(
                        (key: string, index: number) => (
                            <div
                                style={{ marginLeft: '40px', marginTop: '3px' }}
                                key={index}
                            >
                                {renderNode(key, data[key])}
                            </div>
                        )
                    )}
                </>
            )}
        </div>
    )
}

export default JSONTreee
