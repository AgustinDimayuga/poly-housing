export default function Footer() {
  return (
    <footer className="border-t border-border-inputs">
      <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-4 px-5 py-6 text-[11px] text-under-input sm:flex-row sm:px-8 lg:px-10">
        <p>
          PolyHousing · Off-campus housing for Cal Poly students
        </p>
        <div className="flex flex-wrap gap-5">
          {[
            "Help center",
            "Community guidelines",
            "Privacy"
          ].map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
