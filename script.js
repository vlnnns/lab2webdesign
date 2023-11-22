document.addEventListener('DOMContentLoaded', function() {
    let alertShown = false;
    let contentContainer; // Змінна для зберігання контейнера з вмістом

    function createTitleAndButton() {
        const titleElement = document.querySelector('h1');
        const startButton = document.getElementById('startButton');
        const startButton2 = document.getElementById('startButton2');

        function startExercises() {
            titleElement.style.display = 'block';
            titleElement.textContent = 'Start exercises';
            startButton2.addEventListener('click', function() {
                startTimerFor30Seconds();
            });
        }


        function startTimerFor2Minutes() {
            let timer = 5; // 2 minutes in seconds
            const timerElement = document.createElement('div');
            timerElement.classList.add('timer');
            document.body.appendChild(timerElement);

            const timerInterval = setInterval(function () {
                const hours = Math.floor(timer / 3600);
                const minutes = Math.floor((timer % 3600) / 60);
                const seconds = timer % 60;

                timerElement.textContent = `${hours}h ${minutes}m ${seconds}s`;

                if (--timer < 0) {
                    clearInterval(timerInterval);
                    alert("Time for exercises");
                    alertShown = true;
                    titleElement.style.display = 'none';
                    timerElement.textContent = '';
                    startButton2.style.display = 'block';
                    startExercises();
                }
            }, 1000);
        }

        function startTimerFor30Seconds() {
            if (alertShown) {
                alertShown = false;
            }

            startButton2.style.display = 'none';
            titleElement.style.display = 'none';
            let iteration = 0;
            let images = ['img/1.png', 'img/2.png', 'img/3.png', 'img/4.png', 'img/5.png', 'img/6.png'];
            let titles = [
                '1. horizontal movements to the right and left',
                '2. vertical-down eye movements',
                '3. eye movements in a circle',
                '4. frequent blinking of the eyes',
                '5. bringing the eyes to the center',
                '6. eye movement diagonally'
            ];

            function displayContent() {
                if (contentContainer) {
                    document.body.removeChild(contentContainer);
                }

                contentContainer = document.createElement('div');
                contentContainer.classList.add('content-container');
                document.body.appendChild(contentContainer);

                const titleElement = document.createElement('h2');
                titleElement.textContent = titles[iteration];
                titleElement.classList.add('content-title');
                contentContainer.appendChild(titleElement);

                const picture = document.createElement('img');
                picture.src = images[iteration];
                picture.classList.add('content-image');
                contentContainer.appendChild(picture);

                const timerElement = document.createElement('div');
                timerElement.classList.add('timer');
                contentContainer.appendChild(timerElement);

                let seconds = 5;
                const timerInterval = setInterval(function () {
                    const minutes = parseInt(seconds / 60, 10);
                    const remainingSeconds = parseInt(seconds % 60, 10);

                    timerElement.textContent = `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;

                    if (--seconds < 0) {
                        clearInterval(timerInterval);
                        timerElement.textContent = '';
                        titleElement.textContent = '';
                        picture.style.display = 'none';
                        iteration++;

                        if (iteration < 6) {
                            displayContent();
                        } else {
                            if (!alertShown) {
                                alert("Time for a work");
                                alertShown = true;
                            }
                            iteration = 0;
                            showStartButtonAndTitle();
                        }
                    }
                }, 1000);
            }

            displayContent();
        }

        function showStartButtonAndTitle() {
            titleElement.textContent = 'Start work';
            titleElement.style.display = 'block';
            startButton.style.display = 'block';
        }

        startButton.addEventListener('click', function() {
            titleElement.style.display = 'none';
            startButton.style.display = 'none';
            startTimerFor2Minutes();
        });
    }

    createTitleAndButton();
});
