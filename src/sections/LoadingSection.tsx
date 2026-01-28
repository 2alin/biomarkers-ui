export default function LoadingSection() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center p-2 font-semibold text-secondary-600">
      <header className="mb-2 flex flex-col items-center gap-2 text-lg font-bold text-secondary-800">
        <span className="size-20 bg-primary-500 mask-[url(./assets/loader-circle.svg)] mask-size-[100%] motion-safe:animate-spin"></span>
        <h1>Loading data</h1>
      </header>
      <p>Please wait.</p>
    </section>
  );
}
