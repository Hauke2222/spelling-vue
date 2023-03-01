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
        <div></div>
    </div>
    <br />

    <details open>
        <summary>{{ localize('settings') }}</summary>
        <label for="audio">{{ localize('audio') }}</label>
        <input v-model="audio" type="checkbox" name="audio" id="audio" />
        <br />
        <label for="hint">{{ localize('hint') }}</label>
        <input v-model="hint" type="checkbox" name="hint" id="hint" />
        <br />
        <label for="language-select">{{ localize('language') }}</label>
        <select id="language-select" v-model="activeLocale">
            <option value="nl">Nederlands</option>
            <option value="en">English</option>
        </select>
    </details>

    <details open>
        <summary>{{ localize('explanation') }}</summary>
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
    </details>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue';
import nlWords from '../nlWords';
import enWords from '../enWords';
import gameText from '../gameText';

const randomWord = ref('');
const guess = ref('');
const randomWordLetters = ref(['']);
const usedLettersObjects = ref([{}]);
const hint = ref(false);
const audio = ref(true);
const activeLocale = ref('en');

interface LetterObject {
    letter: string;
    color?: 'green' | 'yellow' | 'red';
}

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
        let letterObject: LetterObject = {
            letter: guessedLetters[i],
            color: undefined,
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
