export default function CartIcon() {
  return (
    <button className="relative">
      🛒
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
        0
      </span>
    </button>
  );
}