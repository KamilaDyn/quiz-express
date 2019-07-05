function gameRoutes(app) {
  let goodAnswers = 0;
  let isGameOver = false;
  let callToAFriendUsed = false;
  let questionToTheCrowdUsed = false;
  let halfOnHalfUsed = false;

  const questions = [
    {
      question: "1. Co oznacza skrót HTML?",
      answers: [
        "Hyper Text Market Language",
        "Hyper Texts Marking Lanch",
        "HyperText Markup Language",
        "Hiper Test Markup Language"
      ],
      correctAnswer: 2
    },
    {
      question: "2. Co składa się na Box-Model?",
      answers: [
        "margins, borders, padding, content",
        "margins i padding",
        "nic",
        "content i padding"
      ],
      correctAnswer: 0
    },
    {
      question: "3. Co powoduje użycie position:fixed ?",
      answers: [
        "pozycjonuje elementy",
        "Naprawia element",
        "utrzymuje element przy przewijaniu dokumentu",
        "Nie wprowadza zmian w dokumencie"
      ],
      correctAnswer: 2
    },
    {
      question:
        "4. Ile elementów można uchwycić przez użycie atrybutu 'class' ",
      answers: [
        "tylko jeden element",
        "Maksymalnie pięć elementów",
        "Nie stosujemy tego atrybutu",
        "Dowolną ilość elementów"
      ],
      correctAnswer: 3
    },
    {
      question: "5. Co znaczy W3C (World Wide Web Consortium)",
      answers: [
        "Organizacja projektująca strony internetowe",
        "Organizaja zajmująca się pisaniem stron internetowych",
        "Organizacja zajmująca się ustanawianiem standardów pisania i przesyłania stron www",
        "Organizacja zajmująca się szkoleniem nowych programistów"
      ],
      correctAnswer: 2
    },
    {
      question: "6. Co to jest Branch",
      answers: [
        "Odgałęzienie w repozytorium",
        "Tworzenie nowego repozytorium",
        "Popołudniowy posiłek",
        "Język programowania"
      ],
      correctAnswer: 0
    },
    {
      question: "7. Do czego używamy JSON",
      answers: [
        "Do szybszego pisania kodu",
        "Do wyszukiwania błędów",
        "Do przechowywania i odbierania danych z serwera przez aplikacje na stronie internetowej",
        "Do konwertowania danych"
      ],
      correctAnswer: 2
    },
    {
      question: "8. Co to jest RWD",
      answers: [
        "Technika projektowania strony, tak aby jej wygląd i układ dostosował się automatycznie do rozmiaru okna przeglądarki na której jest wyświetlany",
        "Technika optymalizowania strony pod kątem wyszukiwarek internetowych",
        "Technika pozwalająca utrzymać czysty kod",
        "Technika przechowywania danych"
      ],
      correctAnswer: 0
    },
    {
      question: "9. Różnica między operatorami porównania '==' i '===' ",
      answers: [
        "Operator '==' sprawdza czy dane są sobie równe, podczas gdy operator '===' sprawdza równość oraz typ danych, tj. dane muszą być tego samego typu.",
        "Operator '===' sprawdza czy dane są sobie równe, podczas gdy operator '==' sprawdza równość oraz typ danych, tj. dane muszą być tego samego typu.",
        "Operator '==' sprawdza czy dane są sobie równe, podczas gdy operator '===' typ danych, tj. dane muszą być tego samego typu.",
        "Nie ma różnic między operatorami"
      ],
      correctAnswer: 0
    },
    {
      question: "10. Jaki jest wynik operacji 10+20+”30” w JavaScript?",
      answers: ["60", "102030", "900", "3030"],
      correctAnswer: 3
    },
    {
      question: "11. Co jest przedstawione var myArray = [[[]]]; ",
      answers: [
        "Pusta tablica",
        "Tablica z nawiasami kwadratowymi w środku",
        "Tablica trójwymiarowa",
        "tablica dwuwymiarowa"
      ],
      correctAnswer: 2
    },
    {
      question: "12. Jaka jest oryginalna nazwa JavaScript?",
      answers: ["Java", "Mocha", "JS", "Script"],
      correctAnswer: 1
    }
  ];

  app.get("/question", (req, res) => {
    if (goodAnswers === questions.length) {
      res.json({
        winner: true
      });
    } else if (isGameOver) {
      res.json({
        loser: true
      });
    } else {
      const nextQuestion = questions[goodAnswers];

      const { question, answers } = nextQuestion;

      res.json({
        question,
        answers
      });
    }
  });

  app.post("/answer/:index", (req, res) => {
    if (isGameOver) {
      res.json({
        loser: true
      });
    }

    const { index } = req.params;

    const question = questions[goodAnswers];
    // console.log(question.correctAnswer === Number(index));

    const isGoodAnswer = question.correctAnswer === Number(index);

    if (isGoodAnswer) {
      goodAnswers++;
    } else {
      isGameOver = true;
    }
    res.json({
      correct: isGoodAnswer,
      goodAnswers
    });
  });

  app.get("/help/friend", (req, res) => {
    if (callToAFriendUsed) {
      return res.json({
        text: "To koło zostało wykorzystane"
      });
    }

    callToAFriendUsed = true;

    const doesFriendKnowAnswer = Math.random() < 0.5;

    const question = questions[goodAnswers];

    res.json({
      text: doesFriendKnowAnswer
        ? `Hmm, wydaje mi się , że odpowiedź to${
            question.answers[question.correctAnswer]
          } `
        : `Hmm no nie wiem...`
    });
  });

  app.get("/help/half", (req, res) => {
    if (halfOnHalfUsed) {
      return res.json({
        text: "To koło zostało wykorzystane"
      });
    }
    halfOnHalfUsed = true;

    const question = questions[goodAnswers];

    const answersCopy = question.answers.filter(
      (s, index) => index !== question.correctAnswer
    );
    // console.log(answersCopy);

    answersCopy.splice(~~(Math.random() * answersCopy.length), 1);

    res.json({
      answersToRemove: answersCopy
    });
  });

  app.get("/help/crowd", (req, res) => {
    if (questionToTheCrowdUsed) {
      return res.json({
        text: "To koło zostało wykorzystane"
      });
    }
    const chart = [10, 20, 30, 40];

    for (let i = chart.length - 1; i > 0; i--) {
      const change = Math.floor(Math.random() * 20 - 10);

      chart[i] += change;
      chart[i - 1] -= change;
    }

    questionToTheCrowdUsed = true;
    const question = questions[goodAnswers];
    const { correctAnswer } = question;
    [chart[3], chart[correctAnswer]] = [chart[correctAnswer], chart[3]];

    res.json({
      chart
    });
  });
}

module.exports = gameRoutes;
