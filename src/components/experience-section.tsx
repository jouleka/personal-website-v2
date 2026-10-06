import { Reveal } from "./motion-system";
const experiences = [
  {
    company: "myCicero",
    role: "Frontend Developer",
    period: "2024 — Present",
    detail:
      "Multi-tenant Angular platforms, shared architecture, and predictable state with NgRx.",
    tech: "Angular · RxJS · TypeScript",
  },
  {
    company: "Gutenberg Technology",
    role: "Full Stack JavaScript Developer",
    period: "2022 — 2025",
    detail:
      "Modernizing AngularJS into Angular 15, building e-learning features, and strengthening release testing.",
    tech: "Angular · React · Node.js · PostgreSQL",
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
          Enterprise platforms, learning tools, connected systems. Real teams,
          real deadlines, real users.
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
          Angular & React <span>/</span> Rails & Python <span>/</span> SwiftUI{" "}
          <span>/</span> Rust <span>/</span> Realtime systems <span>/</span>{" "}
          Testing that catches things
        </p>
      </div>
    </section>
  );
}
