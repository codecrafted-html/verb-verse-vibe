
import { Verb, verbs } from '../data/verbs';
import { Exercise } from '../components/ExerciseCard';

export type VerbForm = 'base' | 'pastSimple' | 'pastParticiple';

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getRandomVerbs = (count: number, exclude?: Verb): Verb[] => {
  const availableVerbs = exclude ? verbs.filter(v => v !== exclude) : verbs;
  return shuffleArray(availableVerbs).slice(0, count);
};

const getRandomForm = (): VerbForm => {
  const forms: VerbForm[] = ['base', 'pastSimple', 'pastParticiple'];
  return forms[Math.floor(Math.random() * forms.length)];
};

const getFormName = (form: VerbForm): string => {
  switch (form) {
    case 'base':
      return 'basisvorm';
    case 'pastSimple':
      return 'verleden tijd';
    case 'pastParticiple':
      return 'voltooid deelwoord';
  }
};

export const generateFillBlankExercise = (verb: Verb): Exercise => {
  const targetForm = getRandomForm();
  const answer = verb[targetForm];
  
  let question: string;
  if (targetForm === 'base') {
    question = `Wat is de basisvorm van "${verb.pastSimple}"? (Nederlands: ${verb.dutch})`;
  } else if (targetForm === 'pastSimple') {
    question = `Wat is de verleden tijd van "${verb.base}"? (Nederlands: ${verb.dutch})`;
  } else {
    question = `Wat is het voltooid deelwoord van "${verb.base}"? (Nederlands: ${verb.dutch})`;
  }

  return {
    id: `fill-${verb.base}-${targetForm}`,
    type: 'fill-blank',
    question,
    answer,
    explanation: `${verb.base} → ${verb.pastSimple} → ${verb.pastParticiple}`
  };
};

export const generateSentenceExercise = (verb: Verb): Exercise => {
  const forms: VerbForm[] = ['base', 'pastSimple', 'pastParticiple'];
  const targetForm = forms[Math.floor(Math.random() * forms.length)];
  const sentence = verb.sentences[targetForm];
  const answer = verb[targetForm];

  // Replace the verb form in the sentence with a blank
  const questionWithBlank = sentence.replace(answer, '_____');

  return {
    id: `sentence-${verb.base}-${targetForm}`,
    type: 'sentence-complete',
    question: questionWithBlank,
    answer,
    explanation: `In deze zin moet je de ${getFormName(targetForm)} gebruiken: ${answer}`
  };
};

export const generateMultipleChoiceExercise = (verb: Verb): Exercise => {
  const targetForm = getRandomForm();
  const correctAnswer = verb[targetForm];
  
  const wrongAnswers = getRandomVerbs(3, verb).map(v => v[targetForm]);
  const allOptions = shuffleArray([correctAnswer, ...wrongAnswers]);

  let question: string;
  if (targetForm === 'base') {
    question = `Wat is de basisvorm van "${verb.pastSimple}"?`;
  } else if (targetForm === 'pastSimple') {
    question = `Wat is de verleden tijd van "${verb.base}"?`;
  } else {
    question = `Wat is het voltooid deelwoord van "${verb.base}"?`;
  }

  return {
    id: `mc-${verb.base}-${targetForm}`,
    type: 'multiple-choice',
    question: `${question} (Nederlands: ${verb.dutch})`,
    answer: correctAnswer,
    options: allOptions,
    explanation: `${verb.base} → ${verb.pastSimple} → ${verb.pastParticiple}`
  };
};

export const generateLessonExercises = (lessonNumber: number, exerciseCount: number = 10): Exercise[] => {
  const verbsPerLesson = 10;
  const startIndex = (lessonNumber - 1) * verbsPerLesson;
  const lessonVerbs = verbs.slice(startIndex, startIndex + verbsPerLesson);
  
  if (lessonVerbs.length === 0) {
    // If we've run out of new verbs, use random verbs from all available
    const randomVerbs = getRandomVerbs(verbsPerLesson);
    return generateExercisesFromVerbs(randomVerbs, exerciseCount);
  }
  
  return generateExercisesFromVerbs(lessonVerbs, exerciseCount);
};

const generateExercisesFromVerbs = (verbList: Verb[], exerciseCount: number): Exercise[] => {
  const exercises: Exercise[] = [];
  const exerciseTypes = ['fill-blank', 'sentence-complete', 'multiple-choice'] as const;
  
  for (let i = 0; i < exerciseCount; i++) {
    const verb = verbList[i % verbList.length];
    const exerciseType = exerciseTypes[i % exerciseTypes.length];
    
    let exercise: Exercise;
    switch (exerciseType) {
      case 'fill-blank':
        exercise = generateFillBlankExercise(verb);
        break;
      case 'sentence-complete':
        exercise = generateSentenceExercise(verb);
        break;
      case 'multiple-choice':
        exercise = generateMultipleChoiceExercise(verb);
        break;
    }
    
    exercises.push(exercise);
  }
  
  return shuffleArray(exercises);
};
