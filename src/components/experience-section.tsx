import { Reveal } from "./motion-system";
const experiences = [
  {
    company: "Moveo",
    role: "Lead Frontend Developer",
    period: "Jan 2024 — Present",
    detail:
      "Led frontend architecture for a multi-tenant Angular monorepo, with shared application logic and brand-specific interfaces. Integrated REST APIs and NgRx, built an Ionic app for iOS and Android, and owned store releases. Developed workforce-management features for attendance, scheduling and employee self-service.",
    tech: "Angular · TypeScript · RxJS · NgRx · Ionic · Monorepo",
  },
  {
    company: "Helius",
    role: "Full Stack Developer / Frontend Migration Lead",
    period: "Sep 2021 — Mar 2024",
    detail:
      "Modernized an e-learning platform from AngularJS to Angular 15 while maintaining React.js features and Node.js / HapiJS services. Built product data-management features with PolymerJS, Java / Spring Boot and PostgreSQL, improved responsive layouts, and expanded release testing to catch regressions.",
    tech: "Angular · AngularJS · React.js · PolymerJS · Node.js · HapiJS · Java · Spring Boot · PostgreSQL · RethinkDB",
  },
  {
    company: "Rayonit",
    role: "Full Stack Developer",
    period: "Jun 2021 — Aug 2021",
    detail:
      "Traffic management software and real-time data from connected sensors.",
    tech: "Angular · Spring Boot · MongoDB",
  },
];
export default function ExpertiseAndWorkSection() {
  return (
    <section id="expertise" className="experience-section page-width">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">03 / The day jobs</span>
          <h2>
            Less theory.
            <br />
            <em>More shipped code.</em>
          </h2>
        </div>
        <p>
          Six years building enterprise platforms, learning tools and connected
          systems, with hands-on ownership of frontend architecture and mobile
          delivery.
        </p>
      </Reveal>
      <Reveal className="experience-list">
        {experiences.map((experience, index) => (
          <details
            className="experience-row"
            key={experience.company}
            open={index === 0}
          >
            <summary>
              <span className="experience-period">{experience.period}</span>
              <span className="experience-company">
                {experience.company}
                <small>{experience.role}</small>
              </span>
              <span className="details-symbol" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="experience-detail">
              <p>{experience.detail}</p>
              <span>{experience.tech}</span>
            </div>
          </details>
        ))}
      </Reveal>
      <div className="capabilities">
        <span className="eyebrow">The toolkit</span>
        <p>
          React & Next.js <span>/</span> Angular & Ionic <span>/</span> Node.js{" "}
          <span>/</span> Rails & Python <span>/</span> SwiftUI{" "}
          <span>/</span> Rust <span>/</span> Realtime systems <span>/</span>{" "}
          Testing that catches things
        </p>
      </div>
    </section>
  );
}
