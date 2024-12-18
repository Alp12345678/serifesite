import Link from "next/link";

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

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          2024-1 Dönem Dersleri
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {courses.map((course) => (
            <Link
              key={course.code}
              href={`/courses/${course.code}`}
              className="group block p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
            >
              <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                {course.code} - {course.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
