<template>
    <div class="center">
        <h1>Spelling</h1>
        <ul>
            <div v-if="hint" v-for="letter in shuffleRandomWordLetters">
                <li>{{ letter }}</li>
            </div>
        </ul>
        <ul class="row-ul" v-if="usedLettersObjects">
            <div v-for="letterObject in usedLetters">
                <li
                    :class="
                        letterObject.color === 'green' ? 'green' : letterObject.color === 'yellow' ? 'yellow' : 'red'
                    "
                >
                    {{ letterObject.letter }}
                </li>
            </div>
        </ul>
        <p v-if="outcome">{{ localize('outcome') }}: {{ outcome }}</p>

        <label class="guess-label" for="guess"></label>
        <input
            id="guess"
            class="guess-input"
            v-model="guess"
            placeholder=""
            type="text"
            autocorrect="off"
            autocapitalize="none"
            autocomplete="off"
            autofocus
        />

        <div>
            <button class="button-10" @click="playWord">
                {{ localize('playWord') }}
            </button>
            <button v-if="audio === true" class="button-11" @click="replayWord">
                {{ localize('replayWord') }}
            </button>
        </div>
        <br />
        <div>
            <label for="audio">{{ localize('audio') }}</label>
            <input v-model="audio" type="checkbox" name="audio" id="audio" />
            <label for="hint">{{ localize('hint') }}</label>
            <input v-model="hint" type="checkbox" name="hint" id="hint" />
        </div>
    </div>
    <br />
    <article>
        <p>{{ localize('explanation') }}:</p>
        <p>{{ localize('summary') }}</p>
        <small>
            <em>{{ localize('warning') }}</em>
        </small>
        <p>
            <span class="green">A</span>
            {{ localize('a') }}
        </p>
        <p>
            <span class="yellow">B</span>
            {{ localize('b') }}
        </p>
        <p>
            <span class="red">C</span>
            {{ localize('c') }}
        </p>
    </article>
    <div class="center">
        <button
            @click="
                activeLocale = 'en';
                clearData();
            "
        >
            English
        </button>
        <button
            @click="
                activeLocale = 'nl';
                clearData();
            "
        >
            Nederlands
        </button>
    </div>
    <Translation />
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue';
import Translation from './components/Translation.vue';
import nlWords from '../nlWords';
import enWords from '../enWords';

const randomWord = ref('');
const guess = ref('');
const randomWordLetters = ref(['']);
const usedLettersObjects = ref([{}]);
const hint = ref(false);
const audio = ref(true);
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

async function playWord() {
    clearData();
    let wordsArray;
    if (activeLocale.value === 'nl') {
        wordsArray = nlWords;
    } else {
        wordsArray = enWords;
    }
    randomWord.value = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    console.log(randomWord.value);

    if (audio.value) {
        const utterance = new SpeechSynthesisUtterance(randomWord.value);
        utterance.lang = localize('localeCode');
        speechSynthesis.speak(utterance);
    }
}
function replayWord() {
    const utterance = new SpeechSynthesisUtterance(randomWord.value);
    utterance.lang = localize('localeCode');
    speechSynthesis.speak(utterance);
}

function clearData() {
    usedLettersObjects.value.splice(0, usedLettersObjects.value.length);
    randomWord.value = '';
    guess.value = '';
}
const outcome = computed(() => {
    if (guess.value != '' && guess.value === randomWord.value) {
        return localize('correct');
    }
});
const shuffleRandomWordLetters = computed(() => {
    if (randomWord.value.length) {
        let letters = randomWord.value.split('');
        do {
            randomWordLetters.value = letters.slice().sort(() => Math.random() - 0.5);
        } while (randomWordLetters.value.join('') === letters.join(''));
        return randomWordLetters;
    }
});
const usedLetters = computed(() => {
    let guessedLetters = guess.value.split('');
    let randomWordLetters = randomWord.value.split('');
    usedLettersObjects.value = [];
    for (let i = 0; i < guessedLetters.length; i++) {
        let index = randomWordLetters.indexOf(guessedLetters[i]);
        let letterObject = {
            letter: guessedLetters[i],
            color: '',
        };
        if (guessedLetters[i] === randomWordLetters[i]) {
            letterObject.color = 'green';
        } else if (index !== -1) {
            letterObject.color = 'yellow';
        } else {
            letterObject.color = 'red';
        }
        usedLettersObjects.value.push(letterObject);
    }
    return usedLettersObjects.value;
});
watch(
    () => audio.value,
    audio => {
        if (audio === false) {
            hint.value = true;
        }
    },
);
onMounted(() => {
    if (navigator.language === 'nl-NL') {
        activeLocale.value = 'nl';
    } else {
        activeLocale.value = 'en';
    }
});
</script>

<style scoped></style>
