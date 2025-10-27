export interface ExitSurveyQuestion {
  id: string
  code: string
  text: string
}

export const exitSurveyQuestions: ExitSurveyQuestion[] = [
  {
    id: 'Q1',
    code: 'PO1',
    text: 'How effectively did the program enhance your understanding of the fundamental concepts and theories related to your field of study?',
  },
  {
    id: 'Q2',
    code: 'PO2',
    text: 'To what extent did the program develop your ability to analyze and evaluate information, and apply critical thinking skills to solve problems in your field?',
  },
  {
    id: 'Q3',
    code: 'PO3',
    text: 'How well did the program equip you with the necessary practical skills relevant to your field of study?',
  },
  {
    id: 'Q4',
    code: 'PO4',
    text: 'How effectively did the program help you develop your written and oral communication skills, including the ability to articulate ideas clearly and professionally?',
  },
  {
    id: 'Q5',
    code: 'PO5',
    text: 'Did the program promote ethical awareness and instill a sense of professional and social responsibility in you?',
  },
  {
    id: 'Q6',
    code: 'PO6',
    text: 'To what degree did the program foster your research and inquiry skills, including the ability to conduct independent research and analyze data?',
  },
  {
    id: 'Q7',
    code: 'PO7',
    text: 'How well did the program cultivate your ability to work effectively as part of a team and collaborate with others in your field?',
  },
  {
    id: 'Q8',
    code: 'PO8',
    text: 'To what extent did the program develop your leadership abilities, including the ability to initiate and manage projects and inspire others?',
  },
  {
    id: 'Q9',
    code: 'PO9',
    text: 'Did the program foster a culture of lifelong learning and equip you with the skills to adapt and learn independently in your field?',
  },
  {
    id: 'Q10',
    code: 'PO10',
    text: 'How well did the program enhance your understanding of global issues and prepare you to work in diverse cultural and international contexts?',
  },
  {
    id: 'Q11',
    code: 'PO11',
    text: 'To what degree did the program develop your professionalism, including the ability to adhere to professional ethics, standards, and practices?',
  },
  {
    id: 'Q12',
    code: 'PO12',
    text: 'How effectively did the program prepare you for the job market or further education in your field?',
  },
  {
    id: 'Q13',
    code: 'PSO1',
    text: 'How well has the program prepared you to analyze user requirements, design effective software solutions, and test them to ensure they meet user expectations?',
  },
  {
    id: 'Q14',
    code: 'PSO2',
    text: 'To what extent has the program equipped you with the skills to analyze user requirements, design effective software solutions, and test them to ensure they meet user expectations?',
  },
]

export const ratingScale = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
