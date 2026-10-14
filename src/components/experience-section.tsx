import { Reveal } from "./motion-system";
const experiences = [
  {
    company: "Falcar (Communicator)",
    role: "Lead Frontend & Mobile Developer · Remote contract",
    period: "Mar 2025 — Present",
    detail:
      "Led development of Communicator's Ionic app from scratch for iOS and Android, owning platform-specific builds and store releases. Also developed the Angular frontend for workforce attendance, scheduling and employee self-service.",
    tech: "Angular · Ionic · TypeScript · iOS · Android",
  },
  {
    company: "myCicero",
    role: "Frontend Developer / Frontend Architecture Lead",
    period: "Jan 2024 — Oct 2026",
    detail:
      "Led frontend architecture for a multi-tenant Angular monorepo, sharing application logic while supporting brand-specific interfaces. Integrated REST APIs and NgRx to keep data and behavior consistent across tenants.",
    tech: "Angular · RxJS · NgRx · TypeScript · Monorepo",
  },
  {
    company: "Callblitz",
    role: "JavaScript Developer · Part-time, remote",
    period: "Mar 2025 — May 2026",
    detail:
      "Resolved browser-extension connectivity issues and detected call state in third-party tools such as HubSpot through the DOM. Passed call events to the backend to keep Callblitz's presence display accurate, alongside Angular, Node.js and native macOS / Windows work.",
    tech: "JavaScript · Angular · Node.js · Swift · C#",
  },
  {
    company: "Gutenberg Technology",
    role: "Full Stack JavaScript Developer / Frontend Migration Lead",
    period: "Mar 2022 — May 2025",
    detail:
      "Led frontend modernization across AngularJS and React.js, migrating legacy e-learning functionality to Angular 15. Delivered features across React.js and Angular UI code and Node.js / HapiJS services, with release testing to catch migration regressions.",
    tech: "React.js · Angular · AngularJS · Node.js · PostgreSQL",
  },
  {
    company: "Keendoo",
    role: "Full Stack Developer",
    period: "2021 — 2022",
    detail:
      "Product data management, backend integration, and a more usable mobile experience.",
    tech: "PolymerJS · Spring Boot · Java",
  },
  {
    company: "Rayonit",
    role: "Full Stack Developer",
    period: "2021",
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
