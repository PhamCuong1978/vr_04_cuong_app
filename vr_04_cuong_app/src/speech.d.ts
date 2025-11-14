// This file contains ambient type definitions for the Web Speech API and process.env.
// As this is not a module (no import/export), all declarations are global.

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    abort(): void;
    onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
    onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    readonly isFinal: boolean;
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
    readonly error:
        | 'no-speech'
        | 'audio-capture'
        | 'not-allowed'
        | 'network'
        | 'aborted'
        | 'language-not-supported'
        | 'service-not-allowed'
        | 'bad-grammar';
    readonly message: string;
}

interface Window {
    SpeechRecognition: {
        new(): SpeechRecognition;
    };
    webkitSpeechRecognition: {
        new(): SpeechRecognition;
    };
}

// FIX: Replaced `declare var process` with a namespace augmentation to avoid redeclaring a global variable.
// This makes process.env.API_KEY available to TypeScript by augmenting the existing
// `NodeJS.ProcessEnv` interface, which avoids conflicts with other type definitions for `process`.
declare namespace NodeJS {
    interface ProcessEnv {
        API_KEY: string;
    }
}
