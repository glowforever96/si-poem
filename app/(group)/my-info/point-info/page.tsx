import { getUserPointHistory } from "@/data/getUserPointHistory";
import { groupPointByDate } from "@/lib/groupPointByDate";

export default async function PointInfoPage() {
  const data = await getUserPointHistory();
  const groupedData = groupPointByDate(data);

  return (
    <div className="flex flex-col p-4 pb-[8rem]">
      <div className="mb-8">
        <h1 className="typo-heading-2-bold mb-2">포인트 내역</h1>
      </div>
      {Object.entries(groupedData).map(([date, items]) => (
        <div key={date}>
          <h2 className="typo-body-1-bold mb-2">{date}</h2>
          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-3 bg-gray-100 rounded-md"
              >
                <div className="typo-body-2-medium text-gray-600">
                  {item.reason}
                </div>
                <div className="typo-body-2-bold text-[var(--color-purple-primary)]">
                  +{item.points}P
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
