<script setup lang="ts">
import {ref} from 'vue';

// defineProps<{
//     msg: string;
// }>();

const activeLocale = ref('en');

const gameText = {
    en: {
        playWord: 'New word',
        replayWord: 'Replay word',
        submit: 'Submit',
        audio: 'Audio',
        usedLetters: 'Used letters',
        outcome: 'Outcome',
        hint: 'Display letters',
        correct: 'correct',
        incorrect: 'incorrect',
        localeCode: 'en-GB',
        explanation: 'Game explanation',
        summary:
            'Spell the word that you hear and or make use of the display letters option and guess the word with the shuffeld letters',
        a: ': Correct.',
        b: ': The letter is in the word but it is not at the correct spot.',
        c: ': The letter is not in the word.',
        warning: 'The sound option does not work on all browsers and operating systems.',
    },
    nl: {
        playWord: 'Nieuw woord',
        replayWord: 'Herhaal woord',
        submit: 'Indienen',
        audio: 'Geluid',
        usedLetters: 'Gebruikte letters',
        outcome: 'Uitkomst',
        hint: 'Toon letters',
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
    },
};
function localize(key: string) {
    return gameText[activeLocale.value][key];
}
</script>
