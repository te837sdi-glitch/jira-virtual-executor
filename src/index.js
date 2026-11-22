// import Resolver from '@forge/resolver';
// import api, { route } from '@forge/api';
// const resolver = new Resolver();

// resolver.define('fetchLabels', async (req) => {
//   const key = req.context.extension.issue.key;

//   const res = await api.asUser().requestJira(route`/rest/api/3/issue/${key}?fields=labels`);

//   const data = await res.json();

//   const label = data.fields.labels;
//   if (label == undefined) {
//     console.warn(`${key}: Failed to find labels`);
//     return [];
//   }

//   return label;
// });

// export const handler = resolver.getDefinitions();

import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

// Замість fetchLabels однієї задачі запитуємо список усіх доступних проєктів Jira
resolver.define('fetchProjects', async () => {
  
  const res = await api.asUser().requestJira(route`/rest/api/3/project`);
  const data = await res.json();

  if (!Array.isArray(data)) {
    console.warn('Failed to fetch projects');
    return [];
  }

  // Повертаємо лише потрібні поля (id, ключ і назву кожного проєкту)
  return data.map((project) => ({
    id: project.id,
    key: project.key,
    name: project.name,
  }));
});

export const handler = resolver.getDefinitions();