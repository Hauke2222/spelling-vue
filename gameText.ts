interface GameText {
    [key: string]: {
        [locale: string]: string;
    };
}

const gameText: GameText = {
    en: {
        playWord: 'New word',
        replayWord: 'Replay word',
        submit: 'Submit',
        audio: 'audio',
        usedLetters: 'Used letters',
        outcome: 'Outcome',
        hint: 'display letters',
        correct: 'correct',
        incorrect: 'incorrect',
        localeCode: 'en-GB',
        explanation: 'Game explanation',
        summary:
            'Spell the word that you hear and or make use of the display letters option and guess the word with the shuffeld letters',
        a: ': Correct.',
        b: ': The letter is in the word but it is not at the correct spot.',
        c: ': The letter is not in the word.',
        warning: 'The audio option does not work on all browsers and operating systems.',
        settings: 'settings',
        language: 'language',
    },
    nl: {
        playWord: 'Nieuw woord',
        replayWord: 'Herhaal woord',
        submit: 'Indienen',
        audio: 'geluid',
        usedLetters: 'Gebruikte letters',
        outcome: 'Uitkomst',
        hint: 'toon letters',
        correct: 'goed',
        incorrect: 'fout',
        localeCode: 'nl-NL',
        explanation: 'Spel uitleg',
        summary:
            'Spel het woord dat u hoort en of maak gebruik van de toon letters optie en raad met deze gehusselde letters het juiste woord.',
        a: ': Juist.',
        b: ': De letter komt voor in het woord maar staat niet op de goede plek.',
        c: ': De letter komt niet voor in het woord.',
        warning: 'De geluid optie werkt niet op alle browsers en besturingssystemen.',
        settings: 'Opties',
        language: 'taal',
    },
};

export default gameText;
