export default function ErrorSection() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center p-2 font-semibold text-secondary-600 text-center">
      <header className="mb-2 flex flex-col items-center gap-2 text-lg font-bold text-secondary-600">
        <span className="size-20 bg-primary-300 mask-[url(./assets/cloud-alert.svg)] mask-size-[100%]"></span>
        <h1>Something went wrong</h1>
      </header>
      {/*
        Current error detection mechanism doesn't differentiate error types.
        Once improved we can be more specific with the message shown.
      */}
      <p>There was an issue in our side.</p>
      <p>Try again later and if the issue persists, let us know please.</p>
    </section>
  );
}
