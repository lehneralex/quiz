export const categoryThemes = {
  quiz: {
    primary: '#c5def2',
    secondary: '#a8c8e8',
    name: 'Quiz'
  },
  word: {
    primary: '#fcf8cb',
    secondary: '#f5f0a8',
    name: 'Daily Word'
  },
  debate: {
    primary: '#cadbbb',
    secondary: '#b5c9a1',
    name: 'Debate'
  },
  challenge: {
    primary: '#e7cee2',
    secondary: '#dbb8d3',
    name: 'Challenge'
  },
  info:{
    primary:'#f0ede9',
    name: 'Info'
  }
};

export type CategoryType = keyof typeof categoryThemes;
