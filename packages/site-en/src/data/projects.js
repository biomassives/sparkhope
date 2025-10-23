import projectsData from './projects.json';

export function getAllProjects() {
  return projectsData;
}

export function getProjectById(id) {
  return projectsData.find(project => project.id === id);
}
