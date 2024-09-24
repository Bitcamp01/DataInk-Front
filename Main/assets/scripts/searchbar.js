const dropdowns = document.querySelectorAll('.custom-dropdown');

dropdowns.forEach(dropdown => {
    const selected = dropdown.querySelector('.custom-dropdown__selected');
    const options = dropdown.querySelectorAll('.custom-dropdown__option');

    selected.addEventListener('click', () => {
        dropdown.classList.toggle('active');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            const radio = option.querySelector('.custom-dropdown__radio');
            radio.checked = true; // 라디오 버튼을 수동으로 체크
            selected.textContent = option.querySelector('.custom-dropdown__label').textContent;
            dropdown.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});