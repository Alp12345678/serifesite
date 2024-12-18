import { useRouter } from "next/router";
import Link from "next/link";

const years = ["2023-2024", "2022-2023", "2021-2022"];

export default function CourseYearSelection() {
  const router = useRouter();
  const { code } = router.query; // URL'den ders kodunu al

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-extrabold text-center text-blue-700 mb-6">
          {code} Ders Yılları
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {years.map((year) => (
            <Link
              key={year}
              href={`/courses/${code}/${year}`}
              className="group block p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
            >
              <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors text-center">
                {year}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
