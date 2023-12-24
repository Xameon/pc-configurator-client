import { t } from 'i18next';

const text = t('configureIntelligence', { returnObjects: true });

console.log(text);

export const configureIntelligence = {
  perfomance: {
    header: text,
    min: 1,
    max: 4,
    description: [text],
  },
  budget: {
    header: text,
    min: 1,
    max: 500,
    description: [text],
  },
  memory: {
    header: text,
    min: 1,
    max: 6,
    description: [text],
  },
};
