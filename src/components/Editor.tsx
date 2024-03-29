import { editor } from 'monaco-editor'
import Editor from '@monaco-editor/react'

interface props {
    defaultValue: string
    setEditorContext: (editor: editor.IStandaloneCodeEditor) => void
}

const MonacoEditor: React.FC<props> = ({ defaultValue, setEditorContext }) => {
    const options: editor.IStandaloneEditorConstructionOptions = {
        acceptSuggestionOnCommitCharacter: true,
        acceptSuggestionOnEnter: 'on',
        accessibilitySupport: 'auto',
        autoIndent: 'full',
        automaticLayout: true,
        codeLens: true,
        colorDecorators: true,
        contextmenu: true,
        cursorBlinking: 'blink',
        cursorSmoothCaretAnimation: 'on',
        cursorStyle: 'line',
        disableLayerHinting: false,
        disableMonospaceOptimizations: false,
        dragAndDrop: false,
        fixedOverflowWidgets: false,
        folding: true,
        foldingStrategy: 'auto',
        fontLigatures: false,
        formatOnPaste: false,
        formatOnType: false,
        hideCursorInOverviewRuler: false,
        links: true,
        mouseWheelZoom: false,
        multiCursorMergeOverlapping: true,
        multiCursorModifier: 'alt',
        overviewRulerBorder: false,
        overviewRulerLanes: 0,
        quickSuggestions: true,
        quickSuggestionsDelay: 100,
        readOnly: false,
        renderControlCharacters: false,
        renderFinalNewline: 'on',
        renderLineHighlight: 'none',
        renderWhitespace: 'none',
        revealHorizontalRightPadding: 30,
        roundedSelection: true,
        rulers: [],
        scrollBeyondLastColumn: 5,
        scrollBeyondLastLine: false,
        selectOnLineNumbers: true,
        selectionClipboard: true,
        selectionHighlight: true,
        showFoldingControls: 'mouseover',
        smoothScrolling: false,
        suggestOnTriggerCharacters: true,
        wordBasedSuggestions: 'off',
        // eslint-disable-next-line
        wordSeparators: `~!@#$%^&*()-=+[{]}\|;:'",.<>/?`,
        wordWrap: 'on',
        wordWrapBreakAfterCharacters: '\t})]?|&,;',
        wordWrapBreakBeforeCharacters: '{([+',
        wordWrapColumn: 80,
        wrappingIndent: 'none',
        bracketPairColorization: {
            enabled: true,
            independentColorPoolPerBracketType: true,
        },
        minimap: {
            enabled: false,
        },
        scrollbar: {
            useShadows: false,
            vertical: 'hidden',
        },
    }

    return (
        <Editor
            theme="vs-dark"
            defaultLanguage="json"
            defaultValue={defaultValue}
            options={options}
            onMount={(editor: editor.IStandaloneCodeEditor) =>
                setEditorContext(editor)
            }
        />
    )
}

export default MonacoEditor
