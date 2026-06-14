import { Check } from "lucide-react";

interface props {
  heading: string;
  description: string;
  className ?: string
}

function SmallCard({ heading, description, className }: props) {
  return (
    <div className={`w-full flex justify-center px-4 ${className}`}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
        {/* icon + title row */}
        <div className="flex items-start gap-3">
          <div className="bg-accent/10 text-accent rounded-full p-2 flex items-center justify-center">
            <Check />
          </div>

          <div className="flex flex-col">
            <p className="text-center sm:text-left font-semibold text-gray-800">
              {heading}
            </p>
            <p className="text-center sm:text-left text-sm text-gray-500">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmallCard;
