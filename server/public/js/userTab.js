function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    
    document.querySelectorAll('.sidebar button').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(sectionId + 'Btn').classList.add('active');
}

showSection('perfil');