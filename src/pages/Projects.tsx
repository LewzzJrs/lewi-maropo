export default function Projects() {
  return (
    <div className="dynamic-section">
      <ul className="project-list">
        <li>
          <h3>Modern Web Applications</h3>
          <p>Building high-performance apps with Next.js, React, and TypeScript.</p>
        </li>
        <li>
          <h3>State & Data Management</h3>
          <p>Implementing robust state handling using Zustand and server-state via React Query.</p>
        </li>
        <li>
          <h3>Forms & Validation</h3>
          <p>Creating type-safe, resilient forms with Zod and React Hook Form.</p>
        </li>
      </ul>
    </div>
  );
}