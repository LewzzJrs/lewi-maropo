import { skillsWithIcons } from '../skillsData';

export default function Skills() {
  return (
    <div className="skills">
      <div className="skills-grid">
        {skillsWithIcons.map((skill, index) => (
          <span key={index} className="skill-badge">
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}