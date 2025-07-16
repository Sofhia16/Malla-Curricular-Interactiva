let courses = JSON.parse(localStorage.getItem('courses')) || [];
document.getElementById('viewDiagram').addEventListener('click', () => {
  const diagram = document.getElementById('diagramContainer');
  const tables = document.getElementById('tablesContainer');

  // Ocultar tablas
  tables.classList.add('hidden');
  // Mostrar diagrama
  diagram.classList.remove('hidden');
  diagram.innerHTML = '';

  // Agrupar cursos por semestre
  const semesters = {};
  courses.forEach(course => {
    if (!semesters[course.semester]) {
      semesters[course.semester] = [];
    }
    semesters[course.semester].push(course);
  });

  // Dibujar cada semestre
  Object.keys(semesters).sort((a, b) => a - b).forEach(sem => {
    const semBox = document.createElement('div');
    semBox.className = "semester-box bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 rounded-lg p-4 mb-6";

    const semTitle = document.createElement('h4');
    semTitle.className = "text-lg font-bold mb-2 text-center";
    semTitle.innerText = `Semestre ${sem}`;
    semBox.appendChild(semTitle);

    const coursesWrapper = document.createElement('div');
    coursesWrapper.className = "flex flex-wrap justify-center gap-2";

    semesters[sem].forEach(course => {
      const courseIcon = document.createElement('div');
      courseIcon.className = "course-icon bg-white rounded-md shadow p-2 w-32 text-center text-sm";
      courseIcon.innerText = course.name;
      coursesWrapper.appendChild(courseIcon);
    });

    semBox.appendChild(coursesWrapper);
    diagram.appendChild(semBox);
  });
});
