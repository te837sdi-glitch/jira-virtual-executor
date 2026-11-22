// import React, { useEffect, useState } from 'react';
// import { events, invoke } from '@forge/bridge';

// function App() {
//   const [data, setData] = useState(null);

//   const handleFetchSuccess = (data) => {
//     setData(data);
//     if (data.length === 0) {
//       throw new Error('No labels returned');
//     }
//   };
//   const handleFetchError = () => {
//     console.error('Failed to get label');
//   };

//   useEffect(() => {
//     const fetchLabels = async () => invoke('fetchLabels');
//     fetchLabels().then(handleFetchSuccess).catch(handleFetchError);
//     const subscribeForIssueChangedEvent = () =>
//       events.on('JIRA_ISSUE_CHANGED', () => {
//         fetchLabels().then(handleFetchSuccess).catch(handleFetchError);
//       });
//     const subscription = subscribeForIssueChangedEvent();

//     return () => {
//       subscription.then((subscription) => subscription.unsubscribe());
//     };
//   }, []);

//   if (!data) {
//     return <div>Loading...</div>;
//   }
//   const labels = data.map((label) => <div>{label}</div>);
//   return (
//     <div>
//       <span>dimon:</span>
//       <div>{labels}</div>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';

function App() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    invoke('fetchProjects')
      .then((data) => setProjects(data))
      .catch(() => console.error('Failed to get projects'));
  }, []);

  if (!projects) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Мої проєкти в Jira:</h2>
      {projects.length === 0 ? (
        <div>Проєктів не знайдено</div>
      ) : (
        projects.map((project) => (
          <div key={project.id}>
            <strong>{project.key}</strong> — {project.name}
          </div>
        ))
      )}
    </div>
  );
}

export default App;
