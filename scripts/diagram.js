document.getElementById('viewDiagram').addEventListener('click', () => {
  const container = document.getElementById('diagramContainer');
  container.innerHTML = ''; // Limpiar anterior

  // Obtener cursos
  const courses = JSON.parse(localStorage.getItem('courses')) || [];

  // Generar lista de semestres únicos
  const semesters = [...new Set(courses.map(c => c.semester))].sort((a, b) => a - b);

  // Colores análogos pastel
  const colors = [
    '#fce7f3', '#fbcfe8', '#f9a8d4', '#f472b6', '#ec4899',
    '#e879f9', '#c084fc', '#a855f7', '#9333ea', '#7e22ce'
  ];

  semesters.forEach((sem, idx) => {
    const semesterDiv = document.createElement('div');
    semesterDiv.className = "p-4 mb-4 rounded shadow text-center";
    semesterDiv.style.backgroundColor = colors[idx % colors.length];
    semesterDiv.style.border = "2px solid #d1d5db"; // borde gris claro
    semesterDiv.style.borderRadius = "1rem";
    
    const semTitle = document.createElement('h3');
    semTitle.className = "text-xl font-bold mb-2";
    semTitle.innerText = `Semestre ${sem}`;
    semesterDiv.appendChild(semTitle);

    const semCourses = courses.filter(c => c.semester == sem);

    const coursesContainer = document.createElement('div');
    coursesContainer.className = "flex flex-wrap justify-center gap-2";

    semCourses.forEach(course => {
      const courseDiv = document.createElement('div');
      courseDiv.className = "p-2 rounded border shadow";
      courseDiv.style.backgroundColor = '#fff';
      courseDiv.style.borderColor = '#f472b6';
      courseDiv.style.borderWidth = '2px';
      courseDiv.innerHTML = `
        <strong>${course.name}</strong><br>
        ${course.credits} créditos
        ${course.relation ? `<br><small>→ ${course.relation}</small>` : ''}
      `;
      coursesContainer.appendChild(courseDiv);
    });

    semesterDiv.appendChild(coursesContainer);
    container.appendChild(semesterDiv);
  });

  // Ocultar tablas
  document.getElementById('tablesContainer').style.display = 'none';
  document.getElementById('viewDiagram').style.display = 'none';
});
