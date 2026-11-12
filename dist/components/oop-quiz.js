// Интерактивная самопроверка на страницах ООП; не изменяет учебные тексты.
document.querySelectorAll('[data-demo="oop-quiz"]').forEach((quiz) => {
  const answer = Number(quiz.dataset.answer);
  const feedback = quiz.querySelector('[data-feedback]');
  quiz.querySelectorAll('[data-choice]').forEach((button) => {
    button.addEventListener('click', () => {
      const correct = Number(button.dataset.choice) === answer;
      feedback.textContent = (correct ? 'Верно. ' : 'Попробуйте ещё раз. ') +
        (correct ? quiz.dataset.explanation : 'Повторите материал главы и выберите другой ответ.');
    });
  });
});
