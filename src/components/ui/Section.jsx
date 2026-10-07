export default function Section({ className = '', children, id }) {
  return (
    <section id={id} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 ${className}`}>
      {children}
    </section>
  );
}
