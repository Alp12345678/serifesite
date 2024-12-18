import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import questionsData from "../../data/questions.json";
import Link from "next/link";

// Dersler listesi
const courses = [
    { code: "221", name: "SAĞLIK BİLGİSİ VE TRAFİK KÜLTÜRÜ 1" },
    { code: "222", name: "SAĞLIK BİLGİSİ VE TRAFİK KÜLTÜRÜ 2" },
    { code: "152", name: "COĞRAFYA 2" },
    { code: "151", name: "COĞRAFYA 1" },
    { code: "431", name: "KİMYA - 1" },
    { code: "432", name: "KİMYA - 2" },
    { code: "441", name: "BİYOLOJİ - 1" },
    { code: "442", name: "BİYOLOJİ - 2" },
    { code: "543", name: "TÜRK DİLİ VE EDEBİYATI 3" },
    { code: "998", name: "MATEMATİK - 1" },
    { code: "999", name: "MATEMATİK - 2" },
    { code: "163", name: "MATEMATİK - 3" },
];

interface Question {
  questionNo: number;
  image: string;
  answer: string;
  explanation: string; // Yeni alan
}

export default function CourseTest() {
  const router = useRouter();
  const { code } = router.query;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState<boolean[]>([]);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [elapsedTime, setElapsedTime] = useState<string>("");
  const [startTime, setStartTime] = useState<number>(Date.now());

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");

  const courseName = courses.find((course) => course.code === code)?.name || "Ders Adı Bulunamadı";

  useEffect(() => {
    if (code && questionsData[code as keyof typeof questionsData]) {
      const questionList: Question[] = questionsData[code as keyof typeof questionsData];
      setQuestions(questionList);
      setUserAnswers(Array(questionList.length).fill(""));
      setShowFeedback(Array(questionList.length).fill(false));
      setStartTime(Date.now());
    }
  }, [code]);

  const handleOptionChange = (index: number, option: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = option;
    setUserAnswers(newAnswers);

    const newFeedback = [...showFeedback];
    newFeedback[index] = true;
    setShowFeedback(newFeedback);

    // Yanlış cevap kontrolü
    if (option !== questions[index].answer) {
      setModalContent(questions[index].explanation);
      setShowModal(true);
    }
  };

  const handleFinishTest = () => {
    setIsTestFinished(true);
    const endTime = Date.now();
    const timeDiff = endTime - startTime;
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    setElapsedTime(`${hours} saat ${minutes} dakika ${seconds} saniye`);
  };

  const calculateResults = () => {
    let correct = 0;
    let empty = 0;
    questions.forEach((q, i) => {
      if (!userAnswers[i]) {
        empty++;
      } else if (q.answer === userAnswers[i]) {
        correct++;
      }
    });
    const wrong = questions.length - correct - empty;
    return { correct, wrong, empty };
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full p-6">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          ({code}) - {courseName} - Online Test
        </h1>

        {!isTestFinished ? (
          questions.map((q, index) => (
            <div key={index} className="mb-8 p-2 border-b-8 border-red-500">
              <h2 className="text-lg font-semibold mb-4">Soru {q.questionNo}</h2>
              <img
                src={q.image}
                alt={`Soru ${q.questionNo}`}
                className="w-full h-auto rounded-md mb-4"
              />
              <div className="space-y-2">
                {["A", "B", "C", "D"].map((option) => {
                  const isSelected = userAnswers[index] === option;
                  const show = showFeedback[index];
                  const isCorrect = q.answer === option;

                  return (
                    <label
                      key={option}
                      className={`block p-3 rounded-md border transition-all cursor-pointer ${
                        show
                          ? isSelected
                            ? isCorrect
                              ? "bg-green-100 border-green-500"
                              : "bg-red-100 border-red-500"
                            : isCorrect
                            ? "bg-green-100 border-green-500"
                            : "bg-gray-50"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        checked={isSelected}
                        onChange={() => handleOptionChange(index, option)}
                        className="hidden"
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
<><div className="text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Test Sonuçları</h2>
              <p className="font-bold text-3xl mb-2">Toplam Süre: {elapsedTime}</p>
              <p className="font-bold text-2xl text-green-500">Doğru: {calculateResults().correct}</p>
              <p className="font-bold text-2xl text-red-500">Yanlış: {calculateResults().wrong}</p>
              <p className="font-bold text-2xl text-gray-500">Boş: {calculateResults().empty}</p>
            </div><Link className="items-center justify-center flex mt-4 bg-blue-500 text-gray-100" href="/">Derslere Git</Link></>
        )}

        {!isTestFinished && (
          <button
            onClick={handleFinishTest}
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md"
          >
            Testi Bitir
          </button>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-xl font-bold mb-4 text-center">Doğru Cevabın Açıklaması</h2>
            <p className="text-justify">{modalContent}</p>
            <button
              onClick={closeModal}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
