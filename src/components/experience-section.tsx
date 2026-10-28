import { Reveal } from "./motion-system";
const experiences = [
  {
    company: "Moveo",
    role: "Lead Frontend Developer",
    period: "Jan 2024 — Present",
    detail:
      "Led frontend architecture for a multi-tenant Angular monorepo, structuring shared application logic and configurable interfaces for multiple brands. Introduced NgRx state management and used RxJS with REST integrations to keep UI behavior consistent across tenants. Delivered workforce-management workflows and an Ionic app, owning platform-specific builds, release preparation and store submissions.",
    tech: "Angular · TypeScript · RxJS · NgRx · Ionic · Monorepo · REST APIs · Webpack",
  },
  {
    company: "Helius",
    role: "Full Stack Developer / Frontend Migration Lead",
    period: "Sep 2021 — Mar 2024",
    detail:
      "Led an AngularJS-to-Angular 15 migration while maintaining React.js features and Node.js / HapiJS services. Built responsive product data-management features with PolymerJS, Java / Spring Boot and PostgreSQL. Expanded regression testing to catch release issues, and mentored interns through onboarding, ticket breakdown and technical support.",
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
          systems, with hands-on ownership of frontend architecture, migrations,
          regression testing and release delivery.
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
