import { ReactElement } from 'react'

export type ActiionButtons = {
    label: ReactElement
    onClick: () => void
    isActive: boolean
}
