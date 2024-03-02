import React, { useState } from 'react'

interface JSONTreeProps {
    data: string
    rootNode?: string | null
}

const JSONTreee: React.FC<JSONTreeProps> = ({ data, rootNode }) => {
    const [collapsed, setCollapsed] = useState(false)

    const toggleCollapse = () => {
        setCollapsed((prevCollapsed) => !prevCollapsed)
    }

    const renderNode = (key: string, value: string | number) => {
        console.log(typeof value)
        console.log(value)
        if (typeof value === 'object' && value !== null) {
            return <JSONTreee key={key} data={value} rootNode={key} />
        } else {
            return (
                <div
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
                </div>
            )
        }
    }

    return (
        <div
            style={{
                marginLeft: '20px',
                backgroundColor: '#282C34',
                fontFamily: 'monospace',
            }}
            className="h-full"
        >
            <span onClick={toggleCollapse} style={{ cursor: 'pointer' }}>
                {collapsed ? (
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
                ) : (
                    <span
                        style={{
                            color: '#DA5969',
                            textTransform: 'capitalize',
                        }}
                    >
                        ➖{' '}
                        {/* {`${rootNode ? rootNode : 'Root'}: ${Object.keys(data).length} ${Array.isArray(data) ? 'items' : 'keys'}`} */}
                        {`${rootNode ? rootNode : 'Root'}`}
                    </span>
                )}{' '}
            </span>
            {!collapsed && (
                <>
                    {Object.keys(data as string).map(
                        (key: string, index: number) => (
                            <div style={{ marginLeft: '40px' }} key={index}>
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
