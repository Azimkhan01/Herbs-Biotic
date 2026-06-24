import { MoveDown } from "lucide-react";
import React from "react";

function SmallCard() {
  return (
    <div className="flex justify-center text-teal-900 ">
      <div>
        <p className="text-xl font-semibold">We are close to you and your pet!</p>
        <div className="flex justify-center items-center mt-5 mb-5">
          <button className="group relative overflow-hidden rounded-full px-10 py-4 flex items-center gap-6 bg-[#E1E53F] text-teal-900 font-semibold">
            {/* expanding circle */}
            <span className="absolute right-10 w-10 h-10 bg-white rounded-full transition-all duration-500 ease-out group-hover:w-[120%] group-hover:h-[120%] group-hover:rounded-full group-hover:right-[-10%] group-hover:top-[-10%]" />

            {/* text */}
            <p className="relative z-10 group-hover:text-black transition-colors">
              Contact us
            </p>

            {/* icon circle */}
            <span className="relative z-10 bg-white rounded-full p-2">
              <MoveDown />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SmallCard;
